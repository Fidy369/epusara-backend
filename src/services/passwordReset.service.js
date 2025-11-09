const { PrismaClient } = require('@prisma/client');
const httpStatus = require('http-status').default;
const ApiError = require('../utils/ApiError');

const prisma = new PrismaClient();

/**
 * Create password reset entry
 */
const createPasswordReset = async (resetData) => {
  return prisma.password_resets.create({
    data: resetData,
    include: {
      users: true
    }
  });
};

/**
 * Query password resets
 */
const queryPasswordResets = async (filter = {}, options = {}) => {
  const limit = parseInt(options.limit, 10) || 10;
  const page = parseInt(options.page, 10) || 1;
  const sortBy = options.sortBy || 'created_at:desc';
  const [sortField, sortOrder] = sortBy.split(':');

  const [totalResults, results] = await Promise.all([
    prisma.password_resets.count({ where: filter }),
    prisma.password_resets.findMany({
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
 * Get password reset by id
 */
const getPasswordResetById = async (id) => {
  return prisma.password_resets.findUnique({
    where: { id },
    include: {
      users: true
    }
  });
};

/**
 * Get password reset by user
 */
const getPasswordResetByUser = async (userId) => {
  return prisma.password_resets.findFirst({
    where: { user_id: userId },
    orderBy: { created_at: 'desc' },
    include: {
      users: true
    }
  });
};

/**
 * Delete password reset
 */
const deletePasswordResetById = async (id) => {
  const reset = await getPasswordResetById(id);
  if (!reset) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Password reset not found');
  }
  return prisma.password_resets.delete({ where: { id } });
};

/**
 * Delete password resets by user
 */
const deletePasswordResetsByUser = async (userId) => {
  return prisma.password_resets.deleteMany({
    where: { user_id: userId }
  });
};

/**
 * Update password reset by id
 */
const updatePasswordResetById = async (id, updateBody) => {
  const reset = await getPasswordResetById(id);
  if (!reset) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Password reset not found');
  }
  return prisma.password_resets.update({
    where: { id },
    data: updateBody,
    include: {
      users: true
    }
  });
};

module.exports = {
  createPasswordReset,
  queryPasswordResets,
  getPasswordResetById,
  getPasswordResetByUser,
  updatePasswordResetById,
  deletePasswordResetById,
  deletePasswordResetsByUser,
};