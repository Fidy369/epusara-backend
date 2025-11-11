const httpStatus = require('http-status').default;
const { PrismaClient } = require('@prisma/client');
const ApiError = require('../utils/ApiError');

const prisma = new PrismaClient();

/**
 * Create a deceased category reference
 * @param {Object} categoryBody
 * @returns {Promise<RefKategoriJenazah>}
 */
const createRefKategoriJenazah = async (data) => {
  return prisma.ref_kategori_jenazah.create({ data });
};

/**
 * Query for deceased categories
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<QueryResult>}
 */
const getRefKategoriJenazahs = async (filter = {}, options = {}) => {
  const limit = parseInt(options.limit, 10) || 10;
  const page = parseInt(options.page, 10) || 1;
  const sortBy = options.sortBy || 'created_at:desc';
  const [sortField, sortOrder] = sortBy.split(':');

  const [totalResults, results] = await Promise.all([
    prisma.ref_kategori_jenazah.count({ where: filter }),
    prisma.ref_kategori_jenazah.findMany({
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
 * Get deceased category by id
 * @param {number} id
 * @returns {Promise<RefKategoriJenazah>}
 */
const getRefKategoriJenazahById = async (id) => {
  return prisma.ref_kategori_jenazah.findUnique({ where: { id: parseInt(id) } });
};

/**
 * Get deceased category by code
 * @param {string} code
 * @returns {Promise<RefKategoriJenazah>}
 */
const getCategoryByCode = async (code) => {
  return prisma.ref_kategori_jenazah.findFirst({
    where: { kod_kategori_jenazah: code }
  });
};

/**
 * Get active deceased categories
 * @returns {Promise<Array>}
 */
const getActiveCategories = async () => {
  return prisma.ref_kategori_jenazah.findMany({
    where: { flag_aktif: 1 },
    orderBy: { label_ms: 'asc' }
  });
};

/**
 * Update deceased category by id
 * @param {number} categoryId
 * @param {Object} updateBody
 * @returns {Promise<RefKategoriJenazah>}
 */
const updateRefKategoriJenazahById = async (id, updateBody) => {
  return prisma.ref_kategori_jenazah.update({
    where: { id: parseInt(id) },
    data: updateBody,
  });
};

/**
 * Delete deceased category by id
 * @param {number} categoryId
 * @returns {Promise<RefKategoriJenazah>}
 */
const deleteRefKategoriJenazahById = async (id) => {
  return prisma.ref_kategori_jenazah.delete({ where: { id: parseInt(id) } });
};

module.exports = {
  createRefKategoriJenazah,
  getRefKategoriJenazahs,
  getRefKategoriJenazahById,
  updateRefKategoriJenazahById,
  deleteRefKategoriJenazahById,
};