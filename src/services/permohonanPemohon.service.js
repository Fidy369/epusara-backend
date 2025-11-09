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

const replacePermohonanPemohonById = async (id, replaceBody) => {
  const existingRecord = await prisma.permohonan_pemohon.findUnique({
    where: { id },
  });

  if (!existingRecord) {
    throw new Error('Permohonan pemohon not found');
  }

  return prisma.permohonan_pemohon.update({
    where: { id },
    data: {
      permohonan_id: replaceBody.permohonan_id,
      nama_pemohon: replaceBody.nama_pemohon,
      jenis_pengenalan: replaceBody.jenis_pengenalan,
      no_pengenalan: replaceBody.no_pengenalan,
      ref_hubungan_id: replaceBody.ref_hubungan_id,
      hubungan_lain: replaceBody.hubungan_lain,
      is_waris: replaceBody.is_waris,
      phone: replaceBody.phone,
      email: replaceBody.email,
      address1: replaceBody.address1,
      address2: replaceBody.address2,
      address3: replaceBody.address3,
      poskod: replaceBody.poskod,
      updated_by: replaceBody.updated_by,
      updated_at: new Date(),
    },
  });
};


module.exports = {
  createPermohonanPemohon,
  getPermohonanPemohon,
  getPermohonanPemohonById,
  replacePermohonanPemohonById,
  updatePermohonanPemohonById,
  deletePermohonanPemohonById,
  getByPermohonanId,
  getByHubungan,
};