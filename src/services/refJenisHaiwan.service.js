const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createRefJenisHaiwan = async (data) => {
  return prisma.ref_jenis_haiwan.create({
    data,
  });
};

const getRefJenisHaiwans = async (filter = {}, options = {}) => {
  const limit = parseInt(options.limit, 10) || 10;
  const page = parseInt(options.page, 10) || 1;
  const sortBy = options.sortBy || 'created_at:desc';
  const [sortField, sortOrder] = sortBy.split(':');

  const [totalResults, results] = await Promise.all([
    prisma.ref_jenis_haiwan.count({ where: filter }),
    prisma.ref_jenis_haiwan.findMany({
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

const getRefJenisHaiwanById = async (id) => {
  return prisma.ref_jenis_haiwan.findUnique({ where: { id: parseInt(id) } });
};

const getRefJenisHaiwanByKod = async (kodJenisHaiwan) => {
  return prisma.ref_jenis_haiwan.findFirst({
    where: { kod_jenis_haiwan: kodJenisHaiwan },
  });
};

const updateRefJenisHaiwanById = async (id, updateBody) => {
  return prisma.ref_jenis_haiwan.update({
    where: { id: parseInt(id) },
    data: updateBody,
  });
};

const deleteRefJenisHaiwanById = async (id) => {
  return prisma.ref_jenis_haiwan.delete({ where: { id: parseInt(id) } });
};

const getActiveRefJenisHaiwan = async () => {
  return prisma.ref_jenis_haiwan.findMany({
    where: { is_active: 1 },
    orderBy: { id: 'asc' },
  });
};

const replaceRefJenisHaiwanById = async (id, replaceBody) => {
  const refJenisHaiwan = await getRefJenisHaiwanById(id);
  if (!refJenisHaiwan) {
    throw new Error('Reference jenis haiwan not found');
  }
  
  return prisma.ref_jenis_haiwan.update({
    where: { id: parseInt(id) },
    data: replaceBody,
  });
};

module.exports = {
  createRefJenisHaiwan,
  getRefJenisHaiwans,
  getRefJenisHaiwanByKod,
  getActiveRefJenisHaiwan,
  replaceRefJenisHaiwanById,
  getRefJenisHaiwanById,
  updateRefJenisHaiwanById,
  deleteRefJenisHaiwanById,
};