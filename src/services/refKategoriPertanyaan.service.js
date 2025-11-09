const httpStatus = require('http-status').default;
const { PrismaClient } = require('@prisma/client');
const ApiError = require('../utils/ApiError');

const prisma = new PrismaClient();

const createRefKategoriPertanyaan = async (data) => {
  return prisma.ref_kategori_pertanyaan.create({ data });
};

const getRefKategoriPertanyaans = async (filter = {}, options = {}) => {
  const limit = parseInt(options.limit, 10) || 10;
  const page = parseInt(options.page, 10) || 1;
  const sortBy = options.sortBy || 'order_sequence:asc';
  const [sortField, sortOrder] = sortBy.split(':');

  const [totalResults, results] = await Promise.all([
    prisma.ref_kategori_pertanyaan.count({ where: filter }),
    prisma.ref_kategori_pertanyaan.findMany({
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

const getRefKategoriPertanyaanByKod = async (kod) => {
  return prisma.ref_kategori_pertanyaan.findUnique({ where: { kod_kategori_pertanyaan: kod } });
};

const getActiveCategories = async () => {
  return prisma.ref_kategori_pertanyaan.findMany({
    where: { is_active: true },
    orderBy: { order_sequence: 'asc' }
  });
};

const updateRefKategoriPertanyaanByKod = async (kod, updateBody) => {
  return prisma.ref_kategori_pertanyaan.update({
    where: { kod_kategori_pertanyaan: kod },
    data: updateBody,
  });
};

const deleteRefKategoriPertanyaanByKod = async (kod) => {
  return prisma.ref_kategori_pertanyaan.delete({ where: { kod_kategori_pertanyaan: kod } });
};

const replaceRefKategoriPertanyaanByKod = async (kod, updateBody) => {
  const kategori = await getRefKategoriPertanyaanByKod(kod);
  if (!kategori) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Reference kategori pertanyaan not found');
  }
  
  return prisma.ref_kategori_pertanyaan.update({
    where: { kod_kategori_pertanyaan: kod },
    data: updateBody,
  });
};

module.exports = {
  createRefKategoriPertanyaan,
  getRefKategoriPertanyaans,
  replaceRefKategoriPertanyaanByKod,
  getRefKategoriPertanyaanByKod,
  updateRefKategoriPertanyaanByKod,
  deleteRefKategoriPertanyaanByKod,
};