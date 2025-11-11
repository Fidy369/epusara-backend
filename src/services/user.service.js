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
  // Normalize field names (support both English and Malay)
  const ic = userBody.ic || userBody.no_pengenalan;
  const emel = userBody.emel || userBody.email;
  const nama_penuh = userBody.nama_penuh || userBody.full_name;
  const { password, role, ...userData } = userBody;

  if (!ic) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'IC number is required');
  }
  if (!emel) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email is required');
  }
  if (!nama_penuh) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Full name is required');
  }
  if (!password) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Password is required');
  }
  
  // check email uniqueness in user_profile table
  const existingEmail = await prisma.user_profile.findFirst({ where: { email: emel } });
  if (existingEmail) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  
  // check IC uniqueness in user_profile table
  const existingIC = await prisma.user_profile.findFirst({ where: { no_pengenalan: ic } });
  if (existingIC) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'IC number already taken');
  }
  
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const user = await prisma.users.create({ 
    data: {
      username: ic, // Use IC as username
      password: hashedPassword,
      is_password_reset_required: false,
      is_email_verified: false
    }
  });
  
  // Create user profile
  await prisma.user_profile.create({
    data: {
      user_id: user.id,
      no_pengenalan: ic,
      email: emel,
      full_name: nama_penuh
    }
  });
  
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

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
};
