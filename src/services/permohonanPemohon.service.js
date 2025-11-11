const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createPermohonanPemohon = async (data) => {
  return prisma.permohonan_pemohon.create({
    data,
  });
};

const getPermohonanPemohon = async (filter, options) => {
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy ?? 'created_at';
  const sortType = options.sortType ?? 'desc';

  return prisma.permohonan_pemohon.findMany({
    where: filter,
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { [sortBy]: sortType },
    include: {
      permohonan: true,
      ref_hubungan: true,
    },
  });
};

const getPermohonanPemohonById = async (id) => {
  return prisma.permohonan_pemohon.findUnique({
    where: { id },
    include: {
      permohonan: true,
      ref_hubungan: true,
    },
  });
};

const updatePermohonanPemohonById = async (id, updateBody) => {
  return prisma.permohonan_pemohon.update({
    where: { id },
    data: updateBody,
  });
};

const deletePermohonanPemohonById = async (id) => {
  return prisma.permohonan_pemohon.delete({
    where: { id },
  });
};

const getByPermohonanId = async (permohonanId) => {
  return prisma.permohonan_pemohon.findMany({
    where: { permohonan_id: permohonanId },
    include: {
      permohonan: true,
      ref_hubungan: true,
    },
  });
};

const getByHubungan = async (refHubunganId) => {
  return prisma.permohonan_pemohon.findMany({
    where: { ref_hubungan_id: refHubunganId },
    include: {
      permohonan: true,
      ref_hubungan: true,
    },
    orderBy: { created_at: 'desc' },
  });
};

module.exports = {
  createPermohonanPemohon,
  getPermohonanPemohon,
  getPermohonanPemohonById,
  updatePermohonanPemohonById,
  deletePermohonanPemohonById,
  getByPermohonanId,
  getByHubungan,
};