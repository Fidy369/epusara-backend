const { PrismaClient } = require('@prisma/client');
const httpStatus = require('http-status').default;
const ApiError = require('../utils/ApiError');

const prisma = new PrismaClient();

/**
 * Create refresh token
 */
const createRefreshToken = async (tokenData) => {
  return prisma.refresh_token.create({ data: tokenData });
};

/**
 * Query refresh tokens
 */
const queryRefreshTokens = async (filter = {}, options = {}) => {
  const limit = parseInt(options.limit, 10) || 10;
  const page = parseInt(options.page, 10) || 1;
  const sortBy = options.sortBy || 'created_at:desc';
  const [sortField, sortOrder] = sortBy.split(':');

  const [totalResults, results] = await Promise.all([
    prisma.refresh_token.count({ where: filter }),
    prisma.refresh_token.findMany({
      where: filter,
      orderBy: { [sortField]: sortOrder },
      skip: (page - 1) * limit,
      take: limit
    }),
  ]);

  return { results, page, limit, totalResults };
};

/**
 * Get refresh token by id
 */
const getRefreshTokenById = async (id) => {
  return prisma.refresh_token.findUnique({ where: { id } });
};

/**
 * Get refresh token by token
 */
const getRefreshTokenByToken = async (token) => {
  return prisma.refresh_token.findFirst({ where: { token } });
};

/**
 * Get refresh tokens by user
 */
const getRefreshTokensByUser = async (userId) => {
  return prisma.refresh_token.findMany({
    where: { user_id: userId },
    orderBy: { created_at: 'desc' }
  });
};

/**
 * Revoke refresh token
 */
const revokeRefreshToken = async (id) => {
  const token = await getRefreshTokenById(id);
  if (!token) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Refresh token not found');
  }
  return prisma.refresh_token.update({
    where: { id },
    data: { is_revoked: true }
  });
};

/**
 * Delete refresh token
 */
const deleteRefreshTokenById = async (id) => {
  const token = await getRefreshTokenById(id);
  if (!token) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Refresh token not found');
  }
  return prisma.refresh_token.delete({ where: { id } });
};

/**
 * Delete expired tokens
 */
const deleteExpiredTokens = async () => {
  const now = new Date();
  return prisma.refresh_token.deleteMany({
    where: {
      expires_at: { lt: now }
    }
  });
};

/**
 * Delete refresh tokens by user
 */
const deleteRefreshTokensByUser = async (userId) => {
  return prisma.refresh_token.deleteMany({
    where: { user_id: userId }
  });
};

module.exports = {
  createRefreshToken,
  queryRefreshTokens,
  getRefreshTokenById,
  getRefreshTokenByToken,
  getRefreshTokensByUser,
  revokeRefreshToken,
  deleteRefreshTokenById,
  deleteExpiredTokens,
  deleteRefreshTokensByUser,
};