const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createRefJenisPermohonan = async (data) => {
  return prisma.ref_jenis_permohonan.create({
    data,
  });
};

const getRefJenisPermohonans = async (filter = {}, options = {}) => {
  const limit = parseInt(options.limit, 10) || 10;
  const page = parseInt(options.page, 10) || 1;
  const sortBy = options.sortBy || 'created_at:desc';
  const [sortField, sortOrder] = sortBy.split(':');

  const [totalResults, results] = await Promise.all([
    prisma.ref_jenis_permohonan.count({ where: filter }),
    prisma.ref_jenis_permohonan.findMany({
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

const getRefJenisPermohonanByKod = async (kodJenisPermohonan) => {
  return prisma.ref_jenis_permohonan.findUnique({
    where: { kod_jenis_permohonan: kodJenisPermohonan },
  });
};

const updateRefJenisPermohonanByKod = async (kodJenisPermohonan, updateBody) => {
  return prisma.ref_jenis_permohonan.update({
    where: { kod_jenis_permohonan: kodJenisPermohonan },
    data: updateBody,
  });
};

const deleteRefJenisPermohonanByKod = async (kodJenisPermohonan) => {
  return prisma.ref_jenis_permohonan.delete({
    where: { kod_jenis_permohonan: kodJenisPermohonan },
  });
};

const getActiveRefJenisPermohonan = async () => {
  return prisma.ref_jenis_permohonan.findMany({
    where: { is_active: true },
    orderBy: { kod_jenis_permohonan: 'asc' },
  });
};

module.exports = {
  createRefJenisPermohonan,
  getRefJenisPermohonans,
  getRefJenisPermohonanByKod,
  updateRefJenisPermohonanByKod,
  deleteRefJenisPermohonanByKod,
};