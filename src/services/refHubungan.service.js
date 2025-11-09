const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createRefHubungan = async (data) => {
  return prisma.ref_hubungan.create({
    data,
  });
};

const getRefHubungans = async (filter = {}, options = {}) => {
  const limit = parseInt(options.limit, 10) || 10;
  const page = parseInt(options.page, 10) || 1;
  const sortBy = options.sortBy || 'created_at:desc';
  const [sortField, sortOrder] = sortBy.split(':');

  const [totalResults, results] = await Promise.all([
    prisma.ref_hubungan.count({ where: filter }),
    prisma.ref_hubungan.findMany({
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

const getRefHubunganById = async (id) => {
  return prisma.ref_hubungan.findUnique({ where: { id: parseInt(id) } });
};

const updateRefHubunganById = async (id, updateBody) => {
  return prisma.ref_hubungan.update({
    where: { id: parseInt(id) },
    data: updateBody,
  });
};

const deleteRefHubunganById = async (id) => {
  return prisma.ref_hubungan.delete({ where: { id: parseInt(id) } });
};

const getActiveRefHubungan = async () => {
  return prisma.ref_hubungan.findMany({
    where: { is_active: true },
    orderBy: { id: 'asc' },
  });
};

const replaceRefHubunganById = async (id, replaceBody) => {
  const refHubungan = await getRefHubunganById(id);
  if (!refHubungan) {
    throw new Error('Reference hubungan not found');
  }
  return prisma.ref_hubungan.update({
    where: { id: parseInt(id) },
    data: replaceBody,
  });
};

module.exports = {
  createRefHubungan,
  getRefHubungans,
  getRefHubunganById,
  getActiveRefHubungan,
  replaceRefHubunganById,
  updateRefHubunganById,
  deleteRefHubunganById,
};