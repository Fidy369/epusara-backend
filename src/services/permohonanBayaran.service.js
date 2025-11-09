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

const replacePermohonanBayaranById = async (id, replaceBody) => {
  // First check if the record exists
  const existingRecord = await prisma.permohonan_bayaran.findUnique({
    where: { id },
  });
  
  if (!existingRecord) {
    throw new Error('Permohonan bayaran not found');
  }

  // Full replacement - sets all fields including nulls
  return prisma.permohonan_bayaran.update({
    where: { id },
    data: {
      no_akaun: replaceBody.no_akaun,
      no_bil_pelbagai: replaceBody.no_bil_pelbagai,
      no_resit: replaceBody.no_resit,
      permohonan_id: replaceBody.permohonan_id,
      payment_deadline: replaceBody.payment_deadline,
      status_bayaran: replaceBody.status_bayaran,
      updated_by: replaceBody.updated_by,
      updated_at: new Date(),
    },
  });
};

module.exports = {
  createPermohonanBayaran,
  getPermohonanBayaran,
  getPermohonanBayaranById,
  updatePermohonanBayaranById,
  replacePermohonanBayaranById,
  deletePermohonanBayaranById,
  getByPermohonanId,
  getByStatus,
};