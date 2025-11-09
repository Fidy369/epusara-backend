// src/services/user.service.js

const httpStatus = require('http-status').default;
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const ApiError = require('../utils/ApiError');

const prisma = new PrismaClient();

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  // check email uniqueness in user_profile table
  if (userBody.email) {
    const existing = await prisma.user_profile.findFirst({ where: { email: userBody.email } });
    if (existing) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
  }
  
  // Create user with required fields
  const { email, name, password, role, ...userData } = userBody;
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const user = await prisma.users.create({ 
    data: {
      username: email, // Use email as username for now
      password: hashedPassword,
      is_password_reset_required: false,
      is_email_verified: false
    }
  });
  
  // Create user profile with email if provided
  if (email || name) {
    await prisma.user_profile.create({
      data: {
        user_id: user.id,
        email: email,
        full_name: name
      }
    });
  }
  
  // Assign role if provided
  if (role) {
    // Find the role in the database
    const roleRecord = await prisma.role.findFirst({ where: { name: role } });
    if (roleRecord) {
      await prisma.user_role.create({
        data: {
          user_id: user.id,
          role_id: roleRecord.id
        }
      });
    }
  }
  
  // Add role to user object for response
  user.role = role;
  
  return user;
};

/**
 * Query for users
 * @param {Object} filter - Prisma where‑clause filter
 * @param {Object} options
 * @param {string} [options.sortBy] - e.g. "createdAt:desc"
 * @param {number} [options.limit=10]
 * @param {number} [options.page=1]
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter = {}, options = {}) => {
  const limit = parseInt(options.limit, 10) || 10;
  const page = parseInt(options.page, 10) || 1;
  const sortBy = options.sortBy || 'createdAt:desc';
  const [sortField, sortOrder] = sortBy.split(':');

  const [totalResults, results] = await Promise.all([
    prisma.users.count({ where: filter }),
    prisma.users.findMany({
      where: filter,
      orderBy: { [sortField]: sortOrder },
      skip: (page - 1) * limit,
      take: limit,
    }),
  ]);

  return {
    results,
    page,
    limit,
    totalResults,
  };
};

/**
 * Get user by id
 * @param {number|string} id
 * @returns {Promise<User|null>}
 */
const getUserById = async (id) => {
  return prisma.users.findUnique({ where: { id } });
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User|null>}
 */
const getUserByEmail = async (email) => {
  const userProfile = await prisma.user_profile.findFirst({ 
    where: { email },
    include: { users: true }
  });
  return userProfile ? userProfile.users : null;
};

/**
 * Update user by id
 * @param {number|string} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  // ensure user exists
  const user = await prisma.users.findUnique({ where: { id: userId } });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  // if changing email, ensure it's not taken by another record
  if (updateBody.email) {
    const emailTaken = await prisma.user_profile.findFirst({
      where: { email: updateBody.email, user_id: { not: userId } },
    });
    if (emailTaken) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
  }

  return prisma.users.update({
    where: { id: userId },
    data: updateBody,
  });
};

/**
 * Delete user by id
 * @param {number|string} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  // ensure user exists
  const user = await prisma.users.findUnique({ where: { id: userId } });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  return prisma.users.delete({ where: { id: userId } });
};

/**
 * Replace user by id (full update)
 * @param {number|string} userId
 * @param {Object} replaceBody
 * @returns {Promise<User>}
 */
const replaceUserById = async (userId, replaceBody) => {
  // Ensure user exists
  const user = await prisma.users.findUnique({ where: { id: userId } });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  // Check if email is taken by another user
  if (replaceBody.email) {
    const emailTaken = await prisma.user_profile.findFirst({
      where: { email: replaceBody.email, user_id: { not: userId } },
    });
    if (emailTaken) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
  }

  const { email, name, password, role, ...userData } = replaceBody;
  const hashedPassword = await bcrypt.hash(password, 10);

  // Update user
  const updatedUser = await prisma.users.update({
    where: { id: userId },
    data: {
      username: email,
      password: hashedPassword,
    },
  });

  // Update or create user profile
  await prisma.user_profile.upsert({
    where: { user_id: userId },
    update: {
      email: email,
      full_name: name,
    },
    create: {
      user_id: userId,
      email: email,
      full_name: name,
    },
  });

  // Handle role update
  if (role) {
    // Delete existing role assignments
    await prisma.user_role.deleteMany({
      where: { user_id: userId },
    });

    // Assign new role
    const roleRecord = await prisma.role.findFirst({ where: { name: role } });
    if (roleRecord) {
      await prisma.user_role.create({
        data: {
          user_id: userId,
          role_id: roleRecord.id,
        },
      });
    }
  }

  updatedUser.role = role;
  return updatedUser;
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  replaceUserById,
  updateUserById,
  deleteUserById,
};
