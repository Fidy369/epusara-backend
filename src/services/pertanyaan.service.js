const httpStatus = require('http-status');
const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');
const ApiError = require('../utils/ApiError');

const prisma = new PrismaClient();

/**
 * Transform pertanyaan to convert Buffer to string
 * @param {Object} pertanyaan
 * @returns {Object}
 */
const transformPertanyaan = (pertanyaan) => {
  if (!pertanyaan) return null;
  
  return {
    ...pertanyaan,
    uuid: pertanyaan.uuid ? pertanyaan.uuid.toString('hex') : null,
  };
};

/**
 * Create a pertanyaan
 * @param {Object} pertanyaanBody
 * @returns {Promise<Pertanyaan>}
 */
const createPertanyaan = async (pertanyaanBody) => {
  // Generate UUID as Buffer if not provided
  let uuidBuffer;
  
  if (pertanyaanBody.uuid) {
    // If uuid is provided, ensure it's a Buffer
    uuidBuffer = Buffer.isBuffer(pertanyaanBody.uuid) 
      ? pertanyaanBody.uuid 
      : Buffer.from(pertanyaanBody.uuid);
  } else {
    // Generate new UUID and convert to Buffer
    const uuidString = crypto.randomUUID();
    uuidBuffer = Buffer.from(uuidString.replace(/-/g, ''), 'hex');
  }
  
  const data = {
    ...pertanyaanBody,
    uuid: uuidBuffer,
  };
  
  const result = await prisma.pertanyaan.create({ data });
  return transformPertanyaan(result);
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
    results: results.map(transformPertanyaan),
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
  const result = await prisma.pertanyaan.findUnique({ where: { id: parseInt(id) } });
  return transformPertanyaan(result);
};

/**
 * Update pertanyaan by id
 * @param {ObjectId} pertanyaanId
 * @param {Object} updateBody
 * @returns {Promise<Pertanyaan>}
 */
const updatePertanyaanById = async (pertanyaanId, updateBody) => {
  const pertanyaan = await prisma.pertanyaan.findUnique({ 
    where: { id: parseInt(pertanyaanId) } 
  });
  
  if (!pertanyaan) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Pertanyaan not found');
  }
  
  const result = await prisma.pertanyaan.update({
    where: { id: parseInt(pertanyaanId) },
    data: updateBody,
  });
  
  return transformPertanyaan(result);
};

/**
 * Replace pertanyaan by id (full update)
 * @param {ObjectId} pertanyaanId
 * @param {Object} replaceBody
 * @returns {Promise<Pertanyaan>}
 */
const replacePertanyaanById = async (pertanyaanId, replaceBody) => {
  const pertanyaan = await prisma.pertanyaan.findUnique({ 
    where: { id: parseInt(pertanyaanId) } 
  });
  
  if (!pertanyaan) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Pertanyaan not found');
  }
  
  // For PUT, we replace all fields
  const dataToUpdate = {
    name: replaceBody.name,
    phone_no: replaceBody.phone_no,
    email: replaceBody.email,
    kod_kategori_pertanyaan: replaceBody.kod_kategori_pertanyaan,
    question: replaceBody.question,
    status: replaceBody.status || 'N',
    notes: replaceBody.notes || null,
  };
  
  const result = await prisma.pertanyaan.update({
    where: { id: parseInt(pertanyaanId) },
    data: dataToUpdate,
  });
  
  return transformPertanyaan(result);
};

/**
 * Answer pertanyaan by id
 * @param {ObjectId} pertanyaanId
 * @param {Object} answerBody
 * @returns {Promise<Pertanyaan>}
 */
const answerPertanyaanById = async (pertanyaanId, answerBody) => {
  const pertanyaan = await prisma.pertanyaan.findUnique({ 
    where: { id: parseInt(pertanyaanId) } 
  });
  
  if (!pertanyaan) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Pertanyaan not found');
  }
  
  const result = await prisma.pertanyaan.update({
    where: { id: parseInt(pertanyaanId) },
    data: {
      ...answerBody,
      status: 'A',
      answered_at: new Date(),
    },
  });
  
  return transformPertanyaan(result);
};

/**
 * Delete pertanyaan by id
 * @param {ObjectId} pertanyaanId
 * @returns {Promise<Pertanyaan>}
 */
const deletePertanyaanById = async (pertanyaanId) => {
  const pertanyaan = await prisma.pertanyaan.findUnique({ 
    where: { id: parseInt(pertanyaanId) } 
  });
  
  if (!pertanyaan) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Pertanyaan not found');
  }
  
  const result = await prisma.pertanyaan.delete({ 
    where: { id: parseInt(pertanyaanId) } 
  });
  
  return transformPertanyaan(result);
};

module.exports = {
  createPertanyaan,
  getPertanyaans,
  getPertanyaanById,
  updatePertanyaanById,
  replacePertanyaanById,
  answerPertanyaanById,
  deletePertanyaanById,
};