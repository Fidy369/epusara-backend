const { PrismaClient } = require('@prisma/client');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const prisma = new PrismaClient();

const createRefBahagianBadan = async (data) => {
  return prisma.ref_bahagian_badan.create({
    data,
  });
};

const getRefBahagianBadans = async (filter = {}, options = {}) => {
  const limit = parseInt(options.limit, 10) || 10;
  const page = parseInt(options.page, 10) || 1;
  const sortBy = options.sortBy || 'created_at:desc';
  const [sortField, sortOrder] = sortBy.split(':');

  const [totalResults, results] = await Promise.all([
    prisma.ref_bahagian_badan.count({ where: filter }),
    prisma.ref_bahagian_badan.findMany({
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

const getRefBahagianBadanById = async (id) => {
  return prisma.ref_bahagian_badan.findUnique({ where: { kod_bahagian_badan: id } });
};

const updateRefBahagianBadanById = async (id, updateBody) => {
  const record = await getRefBahagianBadanById(id);
  if (!record) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Reference bahagian badan not found');
  }
  return prisma.ref_bahagian_badan.update({
    where: { kod_bahagian_badan: id },
    data: updateBody,
  });
};

// ADD THIS NEW SERVICE FOR PUT
const replaceRefBahagianBadanById = async (id, replaceBody) => {
  const record = await getRefBahagianBadanById(id);
  if (!record) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Reference bahagian badan not found');
  }
  
  return prisma.ref_bahagian_badan.update({
    where: { kod_bahagian_badan: id },
    data: {
      kod_bahagian_badan: replaceBody.kod_bahagian_badan,
      label_ms: replaceBody.label_ms,
      label_en: replaceBody.label_en || null,
      is_active: replaceBody.is_active !== undefined ? replaceBody.is_active : true,
      updated_by: replaceBody.updated_by || null,
      updated_at: new Date(),
    },
  });
};

const deleteRefBahagianBadanById = async (id) => {
  const record = await getRefBahagianBadanById(id);
  if (!record) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Reference bahagian badan not found');
  }
  return prisma.ref_bahagian_badan.delete({ where: { kod_bahagian_badan: id } });
};

const getActiveRefBahagianBadan = async () => {
  return prisma.ref_bahagian_badan.findMany({
    where: { is_active: true },
    orderBy: { kod_bahagian_badan: 'asc' },
  });
};

module.exports = {
  createRefBahagianBadan,
  getRefBahagianBadans,
  getRefBahagianBadanById,
  updateRefBahagianBadanById,
  replaceRefBahagianBadanById, // ADD THIS
  deleteRefBahagianBadanById,
};