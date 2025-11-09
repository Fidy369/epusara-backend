const { PrismaClient } = require('@prisma/client');
const httpStatus = require('http-status').default;
const ApiError = require('../utils/ApiError');

const prisma = new PrismaClient();

/**
 * Create password history entry
 */
const createPasswordHistory = async (historyData) => {
  return prisma.password_history.create({
    data: historyData,
    include: {
      users: true
    }
  });
};

/**
 * Query password history
 */
const queryPasswordHistory = async (filter = {}, options = {}) => {
  const limit = parseInt(options.limit, 10) || 10;
  const page = parseInt(options.page, 10) || 1;
  const sortBy = options.sortBy || 'created_at:desc';
  const [sortField, sortOrder] = sortBy.split(':');

  const [totalResults, results] = await Promise.all([
    prisma.password_history.count({ where: filter }),
    prisma.password_history.findMany({
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
 * Get password history by id
 */
const getPasswordHistoryById = async (id) => {
  return prisma.password_history.findUnique({
    where: { id },
    include: {
      users: true
    }
  });
};

/**
 * Get password history by user
 */
const getPasswordHistoryByUser = async (userId, limit = 10) => {
  return prisma.password_history.findMany({
    where: { user_id: userId },
    orderBy: { created_at: 'desc' },
    take: limit,
    include: {
      users: true
    }
  });
};

/**
 * Delete password history
 */
const deletePasswordHistoryById = async (id) => {
  const history = await getPasswordHistoryById(id);
  if (!history) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Password history not found');
  }
  return prisma.password_history.delete({ where: { id } });
};

/**
 * Clean expired password history
 */
const cleanExpiredHistory = async () => {
  const now = new Date();
  return prisma.password_history.deleteMany({
    where: {
      expires_at: { lt: now }
    }
  });
};

module.exports = {
  createPasswordHistory,
  queryPasswordHistory,
  getPasswordHistoryById,
  getPasswordHistoryByUser,
  deletePasswordHistoryById,
  cleanExpiredHistory,
};