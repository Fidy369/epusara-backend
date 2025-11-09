const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createPermohonanJenazah = async (data) => {
  return prisma.permohonan_jenazah.create({
    data,
  });
};

const getPermohonanJenazah = async (filter, options) => {
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy ?? 'created_at';
  const sortType = options.sortType ?? 'desc';

  return prisma.permohonan_jenazah.findMany({
    where: filter,
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { [sortBy]: sortType },
    include: {
      permohonan: true,
      ref_kategori_jenazah: true,
      ref_bangsa: true,
      ref_negara: true,
    },
  });
};

const getPermohonanJenazahById = async (id) => {
  return prisma.permohonan_jenazah.findUnique({
    where: { id },
    include: {
      permohonan: true,
      ref_kategori_jenazah: true,
      ref_bangsa: true,
      ref_negara: true,
    },
  });
};

const updatePermohonanJenazahById = async (id, updateBody) => {
  return prisma.permohonan_jenazah.update({
    where: { id },
    data: updateBody,
  });
};

const deletePermohonanJenazahById = async (id) => {
  return prisma.permohonan_jenazah.delete({
    where: { id },
  });
};

const getByPermohonanId = async (permohonanId) => {
  return prisma.permohonan_jenazah.findMany({
    where: { permohonan_id: permohonanId },
    include: {
      permohonan: true,
      ref_kategori_jenazah: true,
      ref_bangsa: true,
      ref_negara: true,
    },
  });
};

const getByKategoriJenazah = async (refKategoriJenazahId) => {
  return prisma.permohonan_jenazah.findMany({
    where: { ref_kategori_jenazah_id: refKategoriJenazahId },
    include: {
      permohonan: true,
      ref_kategori_jenazah: true,
      ref_bangsa: true,
      ref_negara: true,
    },
    orderBy: { created_at: 'desc' },
  });
};

const replacePermohonanJenazahById = async (id, replaceBody) => {
  const permohonanJenazah = await prisma.permohonan_jenazah.findUnique({
    where: { id },
  });

  if (!permohonanJenazah) {
    throw new Error('Permohonan jenazah not found');
  }

  return prisma.permohonan_jenazah.update({
    where: { id },
    data: replaceBody,
  });
};

module.exports = {
  createPermohonanJenazah,
  getPermohonanJenazah,
  getPermohonanJenazahById,
  updatePermohonanJenazahById,
  replacePermohonanJenazahById,
  deletePermohonanJenazahById,
  getByPermohonanId,
  getByKategoriJenazah,
};