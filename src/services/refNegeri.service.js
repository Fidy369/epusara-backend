const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const createRefNegeri = async (data) => {
  return prisma.ref_negeri.create({ data });
};

const getRefNegeris = async (filter = {}, options = {}) => {
  const limit = parseInt(options.limit, 10) || 10;
  const page = parseInt(options.page, 10) || 1;
  const sortBy = options.sortBy || 'label:asc';
  const [sortField, sortOrder] = sortBy.split(':');

  const [totalResults, results] = await Promise.all([
    prisma.ref_negeri.count({ where: filter }),
    prisma.ref_negeri.findMany({
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

const getRefNegeriByKod = async (kod) => {
  return prisma.ref_negeri.findUnique({ where: { kod_negeri: kod } });
};

const updateRefNegeriByKod = async (kod, updateBody) => {
  return prisma.ref_negeri.update({
    where: { kod_negeri: kod },
    data: updateBody,
  });
};

const deleteRefNegeriByKod = async (kod) => {
  return prisma.ref_negeri.delete({ where: { kod_negeri: kod } });
};

const httpStatus = require('http-status').default;
const ApiError = require('../utils/ApiError');

const replaceRefNegeriByKod = async (kod, updateBody) => {
  const negeri = await getRefNegeriByKod(kod);
  if (!negeri) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Reference negeri not found');
  }
  
  return prisma.ref_negeri.update({
    where: { kod_negeri: kod },
    data: updateBody,
  });
};

module.exports = {
  createRefNegeri,
  getRefNegeris,
  getRefNegeriByKod,
  replaceRefNegeriByKod,
  updateRefNegeriByKod,
  deleteRefNegeriByKod,
};