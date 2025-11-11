const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createPermohonanAnggotaBadan = async (data) => {
  return prisma.permohonan_anggota_badan.create({
    data,
  });
};

const getPermohonanAnggotaBadan = async (filter, options) => {
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy ?? 'created_at';
  const sortType = options.sortType ?? 'desc';

  return prisma.permohonan_anggota_badan.findMany({
    where: filter,
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { [sortBy]: sortType },
    include: {
      permohonan: true,
    },
  });
};

const getPermohonanAnggotaBadanById = async (id) => {
  return prisma.permohonan_anggota_badan.findUnique({
    where: { id },
    include: {
      permohonan: true,
    },
  });
};

const updatePermohonanAnggotaBadanById = async (id, updateBody) => {
  return prisma.permohonan_anggota_badan.update({
    where: { id },
    data: updateBody,
  });
};

const deletePermohonanAnggotaBadanById = async (id) => {
  return prisma.permohonan_anggota_badan.delete({
    where: { id },
  });
};

const getByPermohonanId = async (permohonanId) => {
  return prisma.permohonan_anggota_badan.findMany({
    where: { permohonan_id: permohonanId },
    include: {
      permohonan: true,
    },
  });
};

const deleteByPermohonanId = async (permohonanId) => {
  return prisma.permohonan_anggota_badan.deleteMany({
    where: { permohonan_id: permohonanId },
  });
};

module.exports = {
  createPermohonanAnggotaBadan,
  getPermohonanAnggotaBadan,
  getPermohonanAnggotaBadanById,
  updatePermohonanAnggotaBadanById,
  deletePermohonanAnggotaBadanById,
  getByPermohonanId,
  deleteByPermohonanId,
};