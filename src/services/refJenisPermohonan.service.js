const { PrismaClient } = require('@prisma/client');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const prisma = new PrismaClient();

const createRefJenisPermohonan = async (data) => {
  return prisma.ref_jenis_permohonan.create({
    data,
  });
};

const getRefJenisPermohonans = async (filter = {}, options = {}) => {
  const limit = parseInt(options.limit, 10) || 10;
  const page = parseInt(options.page, 10) || 1;
  const sortBy = options.sortBy || 'created_at:desc';
  const [sortField, sortOrder] = sortBy.split(':');

  const [totalResults, results] = await Promise.all([
    prisma.ref_jenis_permohonan.count({ where: filter }),
    prisma.ref_jenis_permohonan.findMany({
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

const getRefJenisPermohonanByKod = async (kodJenisPermohonan) => {
  return prisma.ref_jenis_permohonan.findUnique({
    where: { kod_jenis_permohonan: kodJenisPermohonan },
  });
};

const updateRefJenisPermohonanByKod = async (kodJenisPermohonan, updateBody) => {
  const record = await getRefJenisPermohonanByKod(kodJenisPermohonan);
  if (!record) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Reference jenis permohonan not found');
  }
  return prisma.ref_jenis_permohonan.update({
    where: { kod_jenis_permohonan: kodJenisPermohonan },
    data: updateBody,
  });
};

// ADD THIS NEW SERVICE FOR PUT
const replaceRefJenisPermohonanByKod = async (kodJenisPermohonan, replaceBody) => {
  const record = await getRefJenisPermohonanByKod(kodJenisPermohonan);
  if (!record) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Reference jenis permohonan not found');
  }
  
  return prisma.ref_jenis_permohonan.update({
    where: { kod_jenis_permohonan: kodJenisPermohonan },
    data: {
      kod_jenis_permohonan: replaceBody.kod_jenis_permohonan,
      label_ms: replaceBody.label_ms || null,
      label_en: replaceBody.label_en || null,
      tempoh_sah_permohonan: replaceBody.tempoh_sah_permohonan || 0,
      is_active: replaceBody.is_active !== undefined ? replaceBody.is_active : true,
      updated_by: replaceBody.updated_by || null,
      updated_at: new Date(),
    },
  });
};

const deleteRefJenisPermohonanByKod = async (kodJenisPermohonan) => {
  const record = await getRefJenisPermohonanByKod(kodJenisPermohonan);
  if (!record) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Reference jenis permohonan not found');
  }
  return prisma.ref_jenis_permohonan.delete({
    where: { kod_jenis_permohonan: kodJenisPermohonan },
  });
};

const getActiveRefJenisPermohonan = async () => {
  return prisma.ref_jenis_permohonan.findMany({
    where: { is_active: true },
    orderBy: { kod_jenis_permohonan: 'asc' },
  });
};

module.exports = {
  createRefJenisPermohonan,
  getRefJenisPermohonans,
  getRefJenisPermohonanByKod,
  updateRefJenisPermohonanByKod,
  replaceRefJenisPermohonanByKod, // ADD THIS
  deleteRefJenisPermohonanByKod,
};