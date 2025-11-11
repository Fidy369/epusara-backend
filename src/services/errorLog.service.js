const { PrismaClient } = require('@prisma/client');
const httpStatus = require('http-status').default;
const ApiError = require('../utils/ApiError');

const prisma = new PrismaClient();

/**
 * Create error log
 */
const createErrorLog = async (errorData) => {
  return prisma.error_logs.create({ data: errorData });
};

/**
 * Query error logs
 */
const queryErrorLogs = async (filter = {}, options = {}) => {
  const limit = parseInt(options.limit, 10) || 10;
  const page = parseInt(options.page, 10) || 1;
  const sortBy = options.sortBy || 'created_at:desc';
  const [sortField, sortOrder] = sortBy.split(':');

  const [totalResults, results] = await Promise.all([
    prisma.error_logs.count({ where: filter }),
    prisma.error_logs.findMany({
      where: filter,
      orderBy: { [sortField]: sortOrder },
      skip: (page - 1) * limit,
      take: limit
    }),
  ]);

  return { results, page, limit, totalResults };
};

/**
 * Get error log by id
 */
const getErrorLogById = async (id) => {
  return prisma.error_logs.findUnique({ where: { id } });
};

/**
 * Delete error log
 */
const deleteErrorLogById = async (id) => {
  const errorLog = await getErrorLogById(id);
  if (!errorLog) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Error log not found');
  }
  return prisma.error_logs.delete({ where: { id } });
};

/**
 * Clear old error logs
 */
const clearOldErrorLogs = async (days = 30) => {
  const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  return prisma.error_logs.deleteMany({
    where: {
      created_at: { lt: cutoffDate }
    }
  });
};

/**
 * Get error statistics
 */
const getErrorStatistics = async (hours = 24) => {
  const since = new Date(Date.now() - hours * 60 * 60 * 1000);
  
  const errors = await prisma.error_logs.findMany({
    where: { created_at: { gte: since } },
    select: { type: true, created_at: true }
  });

  const stats = errors.reduce((acc, error) => {
    acc[error.type] = (acc[error.type] || 0) + 1;
    return acc;
  }, {});

  return {
    period_hours: hours,
    total_errors: errors.length,
    error_types: stats
  };
};

module.exports = {
  createErrorLog,
  queryErrorLogs,
  getErrorLogById,
  deleteErrorLogById,
  clearOldErrorLogs,
  getErrorStatistics,
};