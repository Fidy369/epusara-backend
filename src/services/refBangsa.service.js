const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createRefBangsa = async (data) => {
  return prisma.ref_bangsa.create({
    data,
  });
};

const getRefBangsas = async (filter = {}, options = {}) => {
  const limit = parseInt(options.limit, 10) || 10;
  const page = parseInt(options.page, 10) || 1;
  const sortBy = options.sortBy || 'created_at:desc';
  const [sortField, sortOrder] = sortBy.split(':');

  const [totalResults, results] = await Promise.all([
    prisma.ref_bangsa.count({ where: filter }),
    prisma.ref_bangsa.findMany({
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

const getRefBangsaById = async (id) => {
  return prisma.ref_bangsa.findUnique({ where: { id: parseInt(id) } });
};

const updateRefBangsaById = async (id, updateBody) => {
  return prisma.ref_bangsa.update({
    where: { id: parseInt(id) },
    data: updateBody,
  });
};

const deleteRefBangsaById = async (id) => {
  return prisma.ref_bangsa.delete({ where: { id: parseInt(id) } });
};

const getActiveRefBangsa = async () => {
  return prisma.ref_bangsa.findMany({
    where: { is_active: true },
    orderBy: { id: 'asc' },
  });
};

const replaceRefBangsaById = async (id, replaceBody) => {
  const refBangsa = await getRefBangsaById(id);
  if (!refBangsa) {
    throw new Error('Reference bangsa not found');
  }
  
  return prisma.ref_bangsa.update({
    where: { id: parseInt(id) },
    data: replaceBody,
  });
};

module.exports = {
  createRefBangsa,
  getRefBangsas,
  getRefBangsaById,
  getActiveRefBangsa,
  replaceRefBangsaById,
  updateRefBangsaById,
  deleteRefBangsaById,
};