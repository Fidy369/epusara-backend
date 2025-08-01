// src/services/user.service.js

const httpStatus = require('http-status').default;
const { PrismaClient } = require('@prisma/client');
const ApiError = require('../utils/ApiError');

const prisma = new PrismaClient();

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  // check email uniqueness
  const existing = await prisma.users.findUnique({ where: { email: userBody.email } });
  if (existing) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return prisma.users.create({ data: userBody });
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
const getUserByEmail = async (username) => {
  return prisma.users.findFirst({ where: { username } }); //TODO: findUnique
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
    const emailTaken = await prisma.users.findFirst({
      where: { email: updateBody.email, id: { not: userId } },
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
