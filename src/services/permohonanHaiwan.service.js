const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createPermohonanHaiwan = async (data) => {
  return prisma.permohonan_haiwan.create({
    data,
  });
};

const getPermohonanHaiwan = async (filter, options) => {
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy ?? 'created_at';
  const sortType = options.sortType ?? 'desc';

  return prisma.permohonan_haiwan.findMany({
    where: filter,
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { [sortBy]: sortType },
    include: {
      permohonan: true,
    },
  });
};

const getPermohonanHaiwanById = async (id) => {
  return prisma.permohonan_haiwan.findUnique({
    where: { id },
    include: {
      permohonan: true,
    },
  });
};

const updatePermohonanHaiwanById = async (id, updateBody) => {
  return prisma.permohonan_haiwan.update({
    where: { id },
    data: updateBody,
  });
};

const deletePermohonanHaiwanById = async (id) => {
  return prisma.permohonan_haiwan.delete({
    where: { id },
  });
};

const getByPermohonanId = async (permohonanId) => {
  return prisma.permohonan_haiwan.findMany({
    where: { permohonan_id: permohonanId },
    include: {
      permohonan: true,
    },
  });
};

const getByJenisHaiwan = async (refJenisHaiwanKod) => {
  return prisma.permohonan_haiwan.findMany({
    where: { ref_jenis_haiwan_kod: refJenisHaiwanKod },
    include: {
      permohonan: true,
    },
    orderBy: { created_at: 'desc' },
  });
};

const replacePermohonanHaiwanById = async (id, updateBody) => {
  const permohonanHaiwan = await prisma.permohonan_haiwan.findUnique({
    where: { id },
  });
  
  if (!permohonanHaiwan) {
    throw new Error('Permohonan haiwan not found');
  }
  
  return prisma.permohonan_haiwan.update({
    where: { id },
    data: updateBody,
  });
};

module.exports = {
  createPermohonanHaiwan,
  getPermohonanHaiwan,
  getPermohonanHaiwanById,
  replacePermohonanHaiwanById,
  updatePermohonanHaiwanById,
  deletePermohonanHaiwanById,
  getByPermohonanId,
  getByJenisHaiwan,
};