const httpStatus = require('http-status');
const { PrismaClient } = require('@prisma/client');
const ApiError = require('../utils/ApiError');

const prisma = new PrismaClient();

/**
 * Create a pertanyaan
 * @param {Object} pertanyaanBody
 * @returns {Promise<Pertanyaan>}
 */
const createPertanyaan = async (pertanyaanBody) => {
  return prisma.pertanyaan.create({ data: pertanyaanBody });
};

/**
 * Query for pertanyaans
 * @param {Object} filter - Filter options
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
const getPertanyaans = async (filter = {}, options = {}) => {
  const limit = parseInt(options.limit, 10) || 10;
  const page = parseInt(options.page, 10) || 1;
  const sortBy = options.sortBy || 'created_at:desc';
  const [sortField, sortOrder] = sortBy.split(':');

  const [totalResults, results] = await Promise.all([
    prisma.pertanyaan.count({ where: filter }),
    prisma.pertanyaan.findMany({
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
 * Get pertanyaan by id
 * @param {ObjectId} id
 * @returns {Promise<Pertanyaan>}
 */
const getPertanyaanById = async (id) => {
  return prisma.pertanyaan.findUnique({ where: { id: parseInt(id) } });
};

/**
 * Update pertanyaan by id
 * @param {ObjectId} pertanyaanId
 * @param {Object} updateBody
 * @returns {Promise<Pertanyaan>}
 */
const updatePertanyaanById = async (pertanyaanId, updateBody) => {
  const pertanyaan = await getPertanyaanById(pertanyaanId);
  if (!pertanyaan) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Pertanyaan not found');
  }
  return prisma.pertanyaan.update({
    where: { id: parseInt(pertanyaanId) },
    data: updateBody,
  });
};

/**
 * Answer pertanyaan by id
 * @param {ObjectId} pertanyaanId
 * @param {Object} answerBody
 * @returns {Promise<Pertanyaan>}
 */
const answerPertanyaanById = async (pertanyaanId, answerBody) => {
  const pertanyaan = await getPertanyaanById(pertanyaanId);
  if (!pertanyaan) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Pertanyaan not found');
  }
  return prisma.pertanyaan.update({
    where: { id: parseInt(pertanyaanId) },
    data: {
      ...answerBody,
      status: 'A',
      answered_at: new Date(),
    },
  });
};

/**
 * Delete pertanyaan by id
 * @param {ObjectId} pertanyaanId
 * @returns {Promise<Pertanyaan>}
 */
const deletePertanyaanById = async (pertanyaanId) => {
  const pertanyaan = await getPertanyaanById(pertanyaanId);
  if (!pertanyaan) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Pertanyaan not found');
  }
  return prisma.pertanyaan.delete({ where: { id: parseInt(pertanyaanId) } });
};

module.exports = {
  createPertanyaan,
  getPertanyaans,
  getPertanyaanById,
  updatePertanyaanById,
  answerPertanyaanById,
  deletePertanyaanById,
};