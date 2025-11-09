const { PrismaClient } = require('@prisma/client');
const httpStatus = require('http-status').default;
const ApiError = require('../utils/ApiError');

const prisma = new PrismaClient();

/**
 * Create running number entry
 */
const createRunningNumber = async (runningNumberData) => {
  return prisma.permohonan_running_number.create({ data: runningNumberData });
};

/**
 * Query running numbers
 */
const queryRunningNumbers = async (filter = {}, options = {}) => {
  const limit = parseInt(options.limit, 10) || 10;
  const page = parseInt(options.page, 10) || 1;
  const sortBy = options.sortBy || 'date:desc';
  const [sortField, sortOrder] = sortBy.split(':');

  const [totalResults, results] = await Promise.all([
    prisma.permohonan_running_number.count({ where: filter }),
    prisma.permohonan_running_number.findMany({
      where: filter,
      orderBy: { [sortField]: sortOrder },
      skip: (page - 1) * limit,
      take: limit
    }),
  ]);

  return { results, page, limit, totalResults };
};

/**
 * Get running number by id
 */
const getRunningNumberById = async (id) => {
  return prisma.permohonan_running_number.findUnique({ where: { id } });
};

/**
 * Get or create running number for type and date
 */
const getOrCreateRunningNumber = async (type, date) => {
  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);

  let runningNumber = await prisma.permohonan_running_number.findFirst({
    where: { type, date: targetDate }
  });

  if (!runningNumber) {
    runningNumber = await prisma.permohonan_running_number.create({
      data: { type, date: targetDate, running_no: 1 }
    });
  }

  return runningNumber;
};

/**
 * Increment running number
 */
const incrementRunningNumber = async (id) => {
  const runningNumber = await getRunningNumberById(id);
  if (!runningNumber) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Running number not found');
  }

  return prisma.permohonan_running_number.update({
    where: { id },
    data: { running_no: runningNumber.running_no + 1 }
  });
};

/**
 * Get next running number for type and date
 */
const getNextRunningNumber = async (type, date = new Date()) => {
  const runningNumber = await getOrCreateRunningNumber(type, date);
  const updated = await incrementRunningNumber(runningNumber.id);
  return updated.running_no;
};

/**
 * Reset running number
 */
const resetRunningNumber = async (id, newNumber = 0) => {
  const runningNumber = await getRunningNumberById(id);
  if (!runningNumber) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Running number not found');
  }

  return prisma.permohonan_running_number.update({
    where: { id },
    data: { running_no: newNumber }
  });
};

/**
 * Delete running number
 */
const deleteRunningNumberById = async (id) => {
  const runningNumber = await getRunningNumberById(id);
  if (!runningNumber) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Running number not found');
  }
  return prisma.permohonan_running_number.delete({ where: { id } });
};

/**
 * Replace running number by id
 */
const replaceRunningNumber = async (id, updateBody) => {
  const runningNumber = await getRunningNumberById(id);
  if (!runningNumber) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Running number not found');
  }

  // Ensure date is properly formatted
  if (updateBody.date) {
    updateBody.date = new Date(updateBody.date);
    updateBody.date.setHours(0, 0, 0, 0);
  }

  return prisma.permohonan_running_number.update({
    where: { id },
    data: updateBody
  });
};

module.exports = {
  createRunningNumber,
  queryRunningNumbers,
  getRunningNumberById,
  replaceRunningNumber,
  getOrCreateRunningNumber,
  incrementRunningNumber,
  getNextRunningNumber,
  resetRunningNumber,
  deleteRunningNumberById,
};