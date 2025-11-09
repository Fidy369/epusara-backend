const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createPermohonanNotes = async (data) => {
  return prisma.permohonan_notes.create({
    data,
  });
};

const getPermohonanNotes = async (filter, options) => {
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy ?? 'created_at';
  const sortType = options.sortType ?? 'desc';

  return prisma.permohonan_notes.findMany({
    where: filter,
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { [sortBy]: sortType },
    include: {
      permohonan: true,
    },
  });
};

const getPermohonanNotesById = async (id) => {
  return prisma.permohonan_notes.findUnique({
    where: { id },
    include: {
      permohonan: true,
    },
  });
};

const updatePermohonanNotesById = async (id, updateBody) => {
  return prisma.permohonan_notes.update({
    where: { id },
    data: updateBody,
  });
};

const deletePermohonanNotesById = async (id) => {
  return prisma.permohonan_notes.delete({
    where: { id },
  });
};

const getByPermohonanId = async (permohonanId) => {
  return prisma.permohonan_notes.findMany({
    where: { permohonan_id: permohonanId },
    include: {
      permohonan: true,
    },
    orderBy: { created_at: 'desc' },
  });
};

const getByType = async (type) => {
  return prisma.permohonan_notes.findMany({
    where: { type },
    include: {
      permohonan: true,
    },
    orderBy: { created_at: 'desc' },
  });
};

const replacePermohonanNotesById = async (id, updateBody) => {
  const note = await getPermohonanNotesById(id);
  if (!note) {
    throw new Error('Permohonan notes not found');
  }
  
  return prisma.permohonan_notes.update({
    where: { id },
    data: updateBody,
  });
};

module.exports = {
  createPermohonanNotes,
  getPermohonanNotes,
  getPermohonanNotesById,
  replacePermohonanNotesById,
  updatePermohonanNotesById,
  deletePermohonanNotesById,
  getByPermohonanId,
  getByType,
};