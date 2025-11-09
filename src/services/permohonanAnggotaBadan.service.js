const { PrismaClient } = require('@prisma/client');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const prisma = new PrismaClient();

const createPermohonanAnggotaBadan = async (data) => {
  return prisma.permohonan_anggota_badan.create({
    data,
  });
};

const getPermohonanAnggotaBadan = async (filter, options) => {
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy ?? 'created_at';
  const sortType = options.sortType ?? 'desc';

  return prisma.permohonan_anggota_badan.findMany({
    where: filter,
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { [sortBy]: sortType },
    include: {
      permohonan: true,
    },
  });
};

const getPermohonanAnggotaBadanById = async (id) => {
  return prisma.permohonan_anggota_badan.findUnique({
    where: { id: parseInt(id) },
    include: {
      permohonan: true,
    },
  });
};

const updatePermohonanAnggotaBadanById = async (id, updateBody) => {
  const record = await getPermohonanAnggotaBadanById(id);
  if (!record) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Permohonan anggota badan not found');
  }
  return prisma.permohonan_anggota_badan.update({
    where: { id: parseInt(id) },
    data: updateBody,
  });
};

// ADD THIS NEW SERVICE FOR PUT
const replacePermohonanAnggotaBadanById = async (id, replaceBody) => {
  const record = await getPermohonanAnggotaBadanById(id);
  if (!record) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Permohonan anggota badan not found');
  }
  
  return prisma.permohonan_anggota_badan.update({
    where: { id: parseInt(id) },
    data: {
      permohonan_id: replaceBody.permohonan_id,
      ref_bahagian_badan_kod: replaceBody.ref_bahagian_badan_kod,
      bahagian_badan_others: replaceBody.bahagian_badan_others || null,
      updated_by: replaceBody.updated_by || 0,
      updated_at: new Date(),
    },
  });
};

const deletePermohonanAnggotaBadanById = async (id) => {
  const record = await getPermohonanAnggotaBadanById(id);
  if (!record) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Permohonan anggota badan not found');
  }
  return prisma.permohonan_anggota_badan.delete({
    where: { id: parseInt(id) },
  });
};

const getByPermohonanId = async (permohonanId) => {
  return prisma.permohonan_anggota_badan.findMany({
    where: { permohonan_id: permohonanId },
    include: {
      permohonan: true,
    },
  });
};

const deleteByPermohonanId = async (permohonanId) => {
  return prisma.permohonan_anggota_badan.deleteMany({
    where: { permohonan_id: permohonanId },
  });
};

module.exports = {
  createPermohonanAnggotaBadan,
  getPermohonanAnggotaBadan,
  getPermohonanAnggotaBadanById,
  updatePermohonanAnggotaBadanById,
  replacePermohonanAnggotaBadanById, // ADD THIS
  deletePermohonanAnggotaBadanById,
  getByPermohonanId,
  deleteByPermohonanId,
};