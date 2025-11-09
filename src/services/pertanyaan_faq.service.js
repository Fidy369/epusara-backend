const httpStatus = require('http-status');
const { PrismaClient } = require('@prisma/client');
const ApiError = require('../utils/ApiError');

const prisma = new PrismaClient();

/**
 * Create a pertanyaan_faq
 * @param {Object} pertanyaanFaqBody
 * @returns {Promise<PertanyaanFaq>}
 */
const createPertanyaanFaq = async (pertanyaanFaqBody) => {
  return prisma.pertanyaan_faq.create({ data: pertanyaanFaqBody });
};

/**
 * Query for pertanyaan_faqs
 * @param {Object} filter - Filter options
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
const getPertanyaanFaqs = async (filter = {}, options = {}) => {
  const limit = parseInt(options.limit, 10) || 10;
  const page = parseInt(options.page, 10) || 1;
  const sortBy = options.sortBy || 'created_at:desc';
  const [sortField, sortOrder] = sortBy.split(':');

  // Convert is_active from string to boolean if it exists
  if (filter.is_active !== undefined) {
    if (typeof filter.is_active === 'string') {
      filter.is_active = filter.is_active === 'true';
    }
  }

  const [totalResults, results] = await Promise.all([
    prisma.pertanyaan_faq.count({ where: filter }),
    prisma.pertanyaan_faq.findMany({
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
    totalPages: Math.ceil(totalResults / limit),
  };
};

/**
 * Get pertanyaan_faq by id
 * @param {number} id
 * @returns {Promise<PertanyaanFaq>}
 */
const getPertanyaanFaqById = async (id) => {
  return prisma.pertanyaan_faq.findUnique({ where: { id: parseInt(id) } });
};

/**
 * Update pertanyaan_faq by id
 * @param {number} pertanyaanFaqId
 * @param {Object} updateBody
 * @returns {Promise<PertanyaanFaq>}
 */
const updatePertanyaanFaqById = async (pertanyaanFaqId, updateBody) => {
  const pertanyaanFaq = await getPertanyaanFaqById(pertanyaanFaqId);
  if (!pertanyaanFaq) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Pertanyaan FAQ not found');
  }
  
  // Update the updated_at timestamp
  updateBody.updated_at = new Date();
  
  return prisma.pertanyaan_faq.update({
    where: { id: parseInt(pertanyaanFaqId) },
    data: updateBody,
  });
};

/**
 * Replace pertanyaan_faq by id (PUT - full replacement)
 * @param {number} pertanyaanFaqId
 * @param {Object} replaceBody
 * @returns {Promise<PertanyaanFaq>}
 */
const replacePertanyaanFaqById = async (pertanyaanFaqId, replaceBody) => {
  const pertanyaanFaq = await getPertanyaanFaqById(pertanyaanFaqId);
  if (!pertanyaanFaq) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Pertanyaan FAQ not found');
  }
  
  // Update the updated_at timestamp
  replaceBody.updated_at = new Date();
  
  return prisma.pertanyaan_faq.update({
    where: { id: parseInt(pertanyaanFaqId) },
    data: replaceBody,
  });
};

/**
 * Delete pertanyaan_faq by id
 * @param {number} pertanyaanFaqId
 * @returns {Promise<PertanyaanFaq>}
 */
const deletePertanyaanFaqById = async (pertanyaanFaqId) => {
  const pertanyaanFaq = await getPertanyaanFaqById(pertanyaanFaqId);
  if (!pertanyaanFaq) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Pertanyaan FAQ not found');
  }
  return prisma.pertanyaan_faq.delete({ where: { id: parseInt(pertanyaanFaqId) } });
};

module.exports = {
  createPertanyaanFaq,
  getPertanyaanFaqs,
  getPertanyaanFaqById,
  updatePertanyaanFaqById,
  replacePertanyaanFaqById,
  deletePertanyaanFaqById,
};