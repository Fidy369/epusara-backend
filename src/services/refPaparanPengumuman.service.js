const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const createRefPaparanPengumuman = async (data) => {
  if (!prisma.ref_paparan_pengumuman) {
    throw new Error('ref_paparan_pengumuman table is not available');
  }
  return prisma.ref_paparan_pengumuman.create({ data });
};

const getRefPaparanPengumumans = async (filter = {}, options = {}) => {
  const limit = parseInt(options.limit, 10) || 10;
  const page = parseInt(options.page, 10) || 1;
  const sortBy = options.sortBy || 'created_at:desc';
  const [sortField, sortOrder] = sortBy.split(':');

  // Handle case where Prisma model might be ignored
  if (!prisma.ref_paparan_pengumuman) {
    return {
      results: [],
      page,
      limit,
      totalResults: 0,
    };
  }

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
    results: results || [],
    page,
    limit,
    totalResults: totalResults || 0,
  };
};

const getRefPaparanPengumumanById = async (id) => {
  if (!prisma.ref_paparan_pengumuman) {
    return null;
  }
  return prisma.ref_paparan_pengumuman.findUnique({ where: { id: parseInt(id) } });
};

const updateRefPaparanPengumumanById = async (id, updateBody) => {
  if (!prisma.ref_paparan_pengumuman) {
    throw new Error('ref_paparan_pengumuman table is not available');
  }
  return prisma.ref_paparan_pengumuman.update({
    where: { id: parseInt(id) },
    data: updateBody,
  });
};

const deleteRefPaparanPengumumanById = async (id) => {
  if (!prisma.ref_paparan_pengumuman) {
    throw new Error('ref_paparan_pengumuman table is not available');
  }
  return prisma.ref_paparan_pengumuman.delete({ where: { id: parseInt(id) } });
};

module.exports = {
  createRefPaparanPengumuman,
  getRefPaparanPengumumans,
  getRefPaparanPengumumanById,
  updateRefPaparanPengumumanById,
  deleteRefPaparanPengumumanById,
};