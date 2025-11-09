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

const putPermohonanDokumenById = async (id, updateBody) => {
  const existingDoc = await prisma.permohonan_dokumen.findUnique({
    where: { id },
  });
  
  if (!existingDoc) {
    throw new Error('Permohonan dokumen not found');
  }

  return prisma.permohonan_dokumen.update({
    where: { id },
    data: {
      permohonan_id: updateBody.permohonan_id,
      jenis_dokumen: updateBody.jenis_dokumen,
      attachment_id: updateBody.attachment_id,
      updated_by: updateBody.updated_by,
      updated_at: new Date(),
    },
  });
};

module.exports = {
  createPermohonanDokumen,
  getPermohonanDokumen,
  getPermohonanDokumenById,
  updatePermohonanDokumenById,
  putPermohonanDokumenById,
  deletePermohonanDokumenById,
  getByPermohonanId,
  getByJenisDokumen,
};