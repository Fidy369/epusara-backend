const { PrismaClient } = require('@prisma/client');
const httpStatus = require('http-status').default;
const ApiError = require('../utils/ApiError');

const prisma = new PrismaClient();

/**
 * Create permohonan detail
 */
const createPermohonanDetail = async (detailData) => {
  return prisma.permohonan_detail.create({ data: detailData });
};

/**
 * Query permohonan details
 */
const queryPermohonanDetails = async (filter = {}, options = {}) => {
  const limit = parseInt(options.limit, 10) || 10;
  const page = parseInt(options.page, 10) || 1;
  const sortBy = options.sortBy || 'created_at:desc';
  const [sortField, sortOrder] = sortBy.split(':');

  const [totalResults, results] = await Promise.all([
    prisma.permohonan_detail.count({ where: filter }),
    prisma.permohonan_detail.findMany({
      where: filter,
      orderBy: { [sortField]: sortOrder },
      skip: (page - 1) * limit,
      take: limit
    }),
  ]);

  return { results, page, limit, totalResults };
};

/**
 * Get permohonan detail by id
 */
const getPermohonanDetailById = async (id) => {
  return prisma.permohonan_detail.findUnique({ where: { id } });
};

/**
 * Get permohonan detail by permohonan id
 */
const getPermohonanDetailByPermohonanId = async (permohonanId) => {
  return prisma.permohonan_detail.findFirst({
    where: { permohonan_id: permohonanId }
  });
};

/**
 * Update permohonan detail
 */
const updatePermohonanDetailById = async (id, updateData) => {
  const detail = await getPermohonanDetailById(id);
  if (!detail) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Permohonan detail not found');
  }
  return prisma.permohonan_detail.update({
    where: { id },
    data: updateData
  });
};

/**
 * Delete permohonan detail
 */
const deletePermohonanDetailById = async (id) => {
  const detail = await getPermohonanDetailById(id);
  if (!detail) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Permohonan detail not found');
  }
  return prisma.permohonan_detail.delete({ where: { id } });
};

module.exports = {
  createPermohonanDetail,
  queryPermohonanDetails,
  getPermohonanDetailById,
  getPermohonanDetailByPermohonanId,
  updatePermohonanDetailById,
  deletePermohonanDetailById,
};