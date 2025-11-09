const httpStatus = require('http-status').default;
const { PrismaClient } = require('@prisma/client');
const ApiError = require('../utils/ApiError');

const prisma = new PrismaClient();

const createRefNegara = async (data) => {
  return prisma.ref_negara.create({ data });
};

const getRefNegaras = async (filter = {}, options = {}) => {
  const limit = parseInt(options.limit, 10) || 10;
  const page = parseInt(options.page, 10) || 1;
  const sortBy = options.sortBy || 'label_ms:asc';
  const [sortField, sortOrder] = sortBy.split(':');

  const [totalResults, results] = await Promise.all([
    prisma.ref_negara.count({ where: filter }),
    prisma.ref_negara.findMany({
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

const getRefNegaraByKod = async (kod) => {
  return prisma.ref_negara.findUnique({ where: { kod_negara: kod } });
};

const getActiveCountries = async () => {
  return prisma.ref_negara.findMany({
    where: { is_active: true },
    orderBy: { label_ms: 'asc' }
  });
};

const updateRefNegaraByKod = async (kod, updateBody) => {
  return prisma.ref_negara.update({
    where: { kod_negara: kod },
    data: updateBody,
  });
};

const deleteRefNegaraByKod = async (kod) => {
  return prisma.ref_negara.delete({ where: { kod_negara: kod } });
};

const replaceRefNegaraByKod = async (kod, updateBody) => {
  const negara = await getRefNegaraByKod(kod);
  if (!negara) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Reference negara not found');
  }
  
  return prisma.ref_negara.update({
    where: { kod_negara: kod },
    data: updateBody,
  });
};

module.exports = {
  createRefNegara,
  getRefNegaras,
  replaceRefNegaraByKod,
  getRefNegaraByKod,
  updateRefNegaraByKod,
  deleteRefNegaraByKod,
};