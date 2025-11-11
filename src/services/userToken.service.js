const { PrismaClient } = require('@prisma/client');
const httpStatus = require('http-status').default;
const ApiError = require('../utils/ApiError');

const prisma = new PrismaClient();

/**
 * Create user token
 */
const createUserToken = async (tokenData) => {
  return prisma.user_tokens.create({
    data: tokenData,
    include: {
      users: true
    }
  });
};

/**
 * Query user tokens
 */
const queryUserTokens = async (filter = {}, options = {}) => {
  const limit = parseInt(options.limit, 10) || 10;
  const page = parseInt(options.page, 10) || 1;
  const sortBy = options.sortBy || 'created_at:desc';
  const [sortField, sortOrder] = sortBy.split(':');

  const [totalResults, results] = await Promise.all([
    prisma.user_tokens.count({ where: filter }),
    prisma.user_tokens.findMany({
      where: filter,
      orderBy: { [sortField]: sortOrder },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        users: true
      }
    }),
  ]);

  return { results, page, limit, totalResults };
};

/**
 * Get user token by id
 */
const getUserTokenById = async (id) => {
  return prisma.user_tokens.findUnique({
    where: { id },
    include: {
      users: true
    }
  });
};

/**
 * Get user token by selector
 */
const getUserTokenBySelector = async (selector) => {
  return prisma.user_tokens.findFirst({
    where: { selector },
    include: {
      users: true
    }
  });
};

/**
 * Get user tokens by user
 */
const getUserTokensByUser = async (userId) => {
  return prisma.user_tokens.findMany({
    where: { user_id: userId },
    orderBy: { created_at: 'desc' },
    include: {
      users: true
    }
  });
};

/**
 * Update user token
 */
const updateUserTokenById = async (id, updateData) => {
  const token = await getUserTokenById(id);
  if (!token) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User token not found');
  }
  return prisma.user_tokens.update({
    where: { id },
    data: updateData
  });
};

/**
 * Delete user token
 */
const deleteUserTokenById = async (id) => {
  const token = await getUserTokenById(id);
  if (!token) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User token not found');
  }
  return prisma.user_tokens.delete({ where: { id } });
};

/**
 * Delete expired tokens
 */
const deleteExpiredTokens = async () => {
  const now = new Date();
  return prisma.user_tokens.deleteMany({
    where: {
      expires: { lt: now }
    }
  });
};

/**
 * Delete user tokens by user
 */
const deleteUserTokensByUser = async (userId) => {
  return prisma.user_tokens.deleteMany({
    where: { user_id: userId }
  });
};

module.exports = {
  createUserToken,
  queryUserTokens,
  getUserTokenById,
  getUserTokenBySelector,
  getUserTokensByUser,
  updateUserTokenById,
  deleteUserTokenById,
  deleteExpiredTokens,
  deleteUserTokensByUser,
};