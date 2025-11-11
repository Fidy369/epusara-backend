const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createAttachment = async (attachmentData) => {
  return prisma.attachment.create({
    data: attachmentData,
  });
};

const getAttachments = async (filter, options) => {
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy ?? 'uploaded_at';
  const sortType = options.sortType ?? 'desc';

  return prisma.attachment.findMany({
    where: filter,
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { [sortBy]: sortType },
  });
};

const getAttachmentById = async (id) => {
  return prisma.attachment.findUnique({
    where: { id },
  });
};

const getAttachmentByUuid = async (uuid) => {
  return prisma.attachment.findUnique({
    where: { uuid },
  });
};

const updateAttachmentById = async (id, updateBody) => {
  return prisma.attachment.update({
    where: { id },
    data: updateBody,
  });
};

const deleteAttachmentById = async (id) => {
  return prisma.attachment.delete({
    where: { id },
  });
};

const getAttachmentsByType = async (mimeType) => {
  return prisma.attachment.findMany({
    where: { mime_type: mimeType },
    orderBy: { uploaded_at: 'desc' },
  });
};

const getAttachmentsByUploader = async (uploadedBy) => {
  return prisma.attachment.findMany({
    where: { uploaded_by: uploadedBy },
    orderBy: { uploaded_at: 'desc' },
  });
};

module.exports = {
  createAttachment,
  getAttachments,
  getAttachmentById,
  getAttachmentByUuid,
  updateAttachmentById,
  deleteAttachmentById,
  getAttachmentsByType,
  getAttachmentsByUploader,
};