const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createPermohonanBayaran = async (data) => {
  return prisma.permohonan_bayaran.create({
    data,
  });
};

const getPermohonanBayaran = async (filter, options) => {
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy ?? 'created_at';
  const sortType = options.sortType ?? 'desc';

  return prisma.permohonan_bayaran.findMany({
    where: filter,
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { [sortBy]: sortType },
    include: {
      permohonan: true,
    },
  });
};

const getPermohonanBayaranById = async (id) => {
  return prisma.permohonan_bayaran.findUnique({
    where: { id },
    include: {
      permohonan: true,
    },
  });
};

const updatePermohonanBayaranById = async (id, updateBody) => {
  return prisma.permohonan_bayaran.update({
    where: { id },
    data: updateBody,
  });
};

const deletePermohonanBayaranById = async (id) => {
  return prisma.permohonan_bayaran.delete({
    where: { id },
  });
};

const getByPermohonanId = async (permohonanId) => {
  return prisma.permohonan_bayaran.findMany({
    where: { permohonan_id: permohonanId },
    include: {
      permohonan: true,
    },
  });
};

const getByStatus = async (statusBayaran) => {
  return prisma.permohonan_bayaran.findMany({
    where: { status_bayaran: statusBayaran },
    include: {
      permohonan: true,
    },
    orderBy: { created_at: 'desc' },
  });
};

module.exports = {
  createPermohonanBayaran,
  getPermohonanBayaran,
  getPermohonanBayaranById,
  updatePermohonanBayaranById,
  deletePermohonanBayaranById,
  getByPermohonanId,
  getByStatus,
};