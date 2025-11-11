const { PrismaClient } = require('@prisma/client');
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
  return prisma.ref_bahagian_badan.update({
    where: { kod_bahagian_badan: id },
    data: updateBody,
  });
};

const deleteRefBahagianBadanById = async (id) => {
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
  deleteRefBahagianBadanById,
};