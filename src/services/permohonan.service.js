const httpStatus = require('http-status').default;
const { PrismaClient } = require('@prisma/client');
const ApiError = require('../utils/ApiError');

const prisma = new PrismaClient();

/**
 * Generate permohonan number
 * @param {string} type
 * @returns {Promise<string>}
 */
const generatePermohonanNumber = async (type) => {
  const today = new Date();
  const dateStr = today.toISOString().split('T')[0];
  
  // Get or create running number for today
  let runningNumber = await prisma.permohonan_running_number.findFirst({
    where: { type, date: today }
  });
  
  if (!runningNumber) {
    runningNumber = await prisma.permohonan_running_number.create({
      data: { type, date: today, running_no: 1 }
    });
  } else {
    runningNumber = await prisma.permohonan_running_number.update({
      where: { id: runningNumber.id },
      data: { running_no: runningNumber.running_no + 1 }
    });
  }
  
  return `${type}${dateStr.replace(/-/g, '')}${String(runningNumber.running_no).padStart(4, '0')}`;
};

/**
 * Create a permohonan
 * @param {Object} permohonanBody
 * @returns {Promise<Permohonan>}
 */
const createPermohonan = async (permohonanBody) => {
  const { applicant, deceased, ...appData } = permohonanBody;
  
  // Get ref_kategori_jenazah_id from root or deceased object
  const refKategoriJenazahId = appData.ref_kategori_jenazah_id || (deceased && deceased.ref_kategori_jenazah_id);
  
  if (!refKategoriJenazahId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'ref_kategori_jenazah_id is required');
  }
  
  // Generate permohonan number
  const permohonanNumber = await generatePermohonanNumber(appData.kod_jenis_permohonan);
  
  // Create permohonan with related data
  const permohonan = await prisma.permohonan.create({
    data: {
      ...appData,
      ref_kategori_jenazah_id: refKategoriJenazahId,
      no_permohonan: permohonanNumber,
      status_permohonan: 'DRAFT',
      permohonan_pemohon: applicant ? {
        create: applicant
      } : undefined,
      permohonan_jenazah: deceased ? {
        create: deceased
      } : undefined
    },
    include: {
      permohonan_pemohon: true,
      permohonan_jenazah: true,
      ref_jenis_permohonan: true
    }
  });
  
  return permohonan;
};

/**
 * Query for permohonans
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<QueryResult>}
 */
const queryPermohonans = async (filter = {}, options = {}) => {
  const limit = parseInt(options.limit, 10) || 10;
  const page = parseInt(options.page, 10) || 1;
  const sortBy = options.sortBy || 'created_at:desc';
  const [sortField, sortOrder] = sortBy.split(':');

  const [totalResults, results] = await Promise.all([
    prisma.permohonan.count({ where: filter }),
    prisma.permohonan.findMany({
      where: filter,
      orderBy: { [sortField]: sortOrder },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        permohonan_pemohon: true,
        permohonan_jenazah: true,
        permohonan_bayaran: true,
        permohonan_dokumen: true,
        ref_jenis_permohonan: true
      }
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
 * Get permohonan by id
 * @param {number} id
 * @returns {Promise<Permohonan>}
 */
const getPermohonanById = async (id) => {
  return prisma.permohonan.findUnique({ 
    where: { id },
    include: {
      permohonan_pemohon: true,
      permohonan_jenazah: true,
      permohonan_bayaran: true,
      permohonan_dokumen: {
        include: {
          attachment: true
        }
      },
      permohonan_notes: true,
      ref_jenis_permohonan: true
    }
  });
};

/**
 * Update permohonan by id
 * @param {number} permohonanId
 * @param {Object} updateBody
 * @returns {Promise<Permohonan>}
 */
const updatePermohonanById = async (permohonanId, updateBody) => {
  const permohonan = await getPermohonanById(permohonanId);
  if (!permohonan) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Permohonan not found');
  }

  return prisma.permohonan.update({
    where: { id: permohonanId },
    data: updateBody,
  });
};

/**
 * Replace permohonan by id (PUT - full replacement)
 * @param {number} permohonanId
 * @param {Object} replaceBody
 * @returns {Promise<Permohonan>}
 */
const replacePermohonanById = async (permohonanId, replaceBody) => {
  const permohonan = await getPermohonanById(permohonanId);
  if (!permohonan) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Permohonan not found');
  }

  return prisma.permohonan.update({
    where: { id: permohonanId },
    data: {
      kod_jenis_permohonan: replaceBody.kod_jenis_permohonan,
      ref_kategori_jenazah_id: replaceBody.ref_kategori_jenazah_id,
      status_permohonan: replaceBody.status_permohonan || permohonan.status_permohonan,
      updated_at: new Date(),
    },
  });
};

/**
 * Submit permohonan
 * @param {number} permohonanId
 * @returns {Promise<Permohonan>}
 */
const submitPermohonan = async (permohonanId) => {
  const permohonan = await getPermohonanById(permohonanId);
  if (!permohonan) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Permohonan not found');
  }
  
  if (permohonan.status_permohonan !== 'DRAFT') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Only draft permohonans can be submitted');
  }

  return prisma.permohonan.update({
    where: { id: permohonanId },
    data: { status_permohonan: 'IN_PROGRESS' },
  });
};

/**
 * Approve permohonan
 * @param {number} permohonanId
 * @param {string} notes
 * @returns {Promise<Permohonan>}
 */
const approvePermohonan = async (permohonanId, notes) => {
  const permohonan = await getPermohonanById(permohonanId);
  if (!permohonan) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Permohonan not found');
  }

  const updatedPermohonan = await prisma.permohonan.update({
    where: { id: permohonanId },
    data: { status_permohonan: 'APPROVED' },
  });

  if (notes) {
    await prisma.permohonan_notes.create({
      data: {
        permohonan_id: permohonanId,
        type: 'APPROVAL',
        notes: notes
      }
    });
  }

  return updatedPermohonan;
};

/**
 * Reject permohonan
 * @param {number} permohonanId
 * @param {string} notes
 * @returns {Promise<Permohonan>}
 */
const rejectPermohonan = async (permohonanId, notes) => {
  const permohonan = await getPermohonanById(permohonanId);
  if (!permohonan) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Permohonan not found');
  }

  const updatedPermohonan = await prisma.permohonan.update({
    where: { id: permohonanId },
    data: { status_permohonan: 'REJECTED' },
  });

  if (notes) {
    await prisma.permohonan_notes.create({
      data: {
        permohonan_id: permohonanId,
        type: 'REJECTION',
        notes: notes
      }
    });
  }

  return updatedPermohonan;
};

/**
 * Delete permohonan by id
 * @param {number} permohonanId
 * @returns {Promise<Permohonan>}
 */
const deletePermohonanById = async (permohonanId) => {
  const permohonan = await getPermohonanById(permohonanId);
  if (!permohonan) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Permohonan not found');
  }
  return prisma.permohonan.delete({ where: { id: permohonanId } });
};

module.exports = {
  createPermohonan,
  queryPermohonans,
  getPermohonanById,
  updatePermohonanById,
  replacePermohonanById, // ADD THIS
  submitPermohonan,
  approvePermohonan,
  rejectPermohonan,
  deletePermohonanById,
};