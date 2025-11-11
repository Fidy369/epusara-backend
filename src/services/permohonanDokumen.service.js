const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createPermohonanDokumen = async (data) => {
  return prisma.permohonan_dokumen.create({
    data,
  });
};

const getPermohonanDokumen = async (filter, options) => {
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy ?? 'created_at';
  const sortType = options.sortType ?? 'desc';

  return prisma.permohonan_dokumen.findMany({
    where: filter,
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { [sortBy]: sortType },
    include: {
      permohonan: true,
      attachment: true,
    },
  });
};

const getPermohonanDokumenById = async (id) => {
  return prisma.permohonan_dokumen.findUnique({
    where: { id },
    include: {
      permohonan: true,
      attachment: true,
    },
  });
};

const updatePermohonanDokumenById = async (id, updateBody) => {
  return prisma.permohonan_dokumen.update({
    where: { id },
    data: updateBody,
  });
};

const deletePermohonanDokumenById = async (id) => {
  return prisma.permohonan_dokumen.delete({
    where: { id },
  });
};

const getByPermohonanId = async (permohonanId) => {
  return prisma.permohonan_dokumen.findMany({
    where: { permohonan_id: permohonanId },
    include: {
      permohonan: true,
      attachment: true,
    },
  });
};

const getByJenisDokumen = async (jenisDokumen) => {
  return prisma.permohonan_dokumen.findMany({
    where: { jenis_dokumen: jenisDokumen },
    include: {
      permohonan: true,
      attachment: true,
    },
    orderBy: { created_at: 'desc' },
  });
};

module.exports = {
  createPermohonanDokumen,
  getPermohonanDokumen,
  getPermohonanDokumenById,
  updatePermohonanDokumenById,
  deletePermohonanDokumenById,
  getByPermohonanId,
  getByJenisDokumen,
};