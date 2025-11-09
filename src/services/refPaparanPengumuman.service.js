const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const createRefPaparanPengumuman = async (data) => {
  return prisma.ref_paparan_pengumuman.create({ data });
};

const getRefPaparanPengumumans = async (filter = {}, options = {}) => {
  const limit = parseInt(options.limit, 10) || 10;
  const page = parseInt(options.page, 10) || 1;
  const sortBy = options.sortBy || 'created_at:desc';
  const [sortField, sortOrder] = sortBy.split(':');

  const [totalResults, results] = await Promise.all([
    prisma.ref_paparan_pengumuman.count({ where: filter }),
    prisma.ref_paparan_pengumuman.findMany({
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

const getRefPaparanPengumumanById = async (id) => {
  return prisma.ref_paparan_pengumuman.findUnique({ where: { id: parseInt(id) } });
};

const updateRefPaparanPengumumanById = async (id, updateBody) => {
  return prisma.ref_paparan_pengumuman.update({
    where: { id: parseInt(id) },
    data: updateBody,
  });
};

const deleteRefPaparanPengumumanById = async (id) => {
  return prisma.ref_paparan_pengumuman.delete({ where: { id: parseInt(id) } });
};

const httpStatus = require('http-status').default;
const ApiError = require('../utils/ApiError');

const replaceRefPaparanPengumumanById = async (id, updateBody) => {
  const pengumuman = await getRefPaparanPengumumanById(id);
  if (!pengumuman) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Reference paparan pengumuman not found');
  }
  
  return prisma.ref_paparan_pengumuman.update({
    where: { id: parseInt(id) },
    data: updateBody,
  });
};

module.exports = {
  createRefPaparanPengumuman,
  getRefPaparanPengumumans,
  replaceRefPaparanPengumumanById,
  getRefPaparanPengumumanById,
  updateRefPaparanPengumumanById,
  deleteRefPaparanPengumumanById,
};