const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createEmailTemplate = async (data) => {
  return prisma.email_template.create({
    data,
  });
};

const getEmailTemplates = async (filter, options) => {
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy ?? 'created_at';
  const sortType = options.sortType ?? 'desc';

  return prisma.email_template.findMany({
    where: filter,
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { [sortBy]: sortType },
  });
};

const getEmailTemplateById = async (id) => {
  return prisma.email_template.findUnique({
    where: { id },
  });
};

const getEmailTemplateByKey = async (key) => {
  return prisma.email_template.findFirst({
    where: { key },
  });
};

const updateEmailTemplateById = async (id, updateBody) => {
  return prisma.email_template.update({
    where: { id },
    data: updateBody,
  });
};

const deleteEmailTemplateById = async (id) => {
  return prisma.email_template.delete({
    where: { id },
  });
};

const getActiveTemplates = async () => {
  return prisma.email_template.findMany({
    orderBy: { created_at: 'desc' },
  });
};

const replaceEmailTemplateById = async (id, replaceBody) => {
  // Check if template exists
  const emailTemplate = await prisma.email_template.findUnique({
    where: { id },
  });
  
  if (!emailTemplate) {
    throw new Error('Email template not found');
  }

  return prisma.email_template.update({
    where: { id },
    data: replaceBody,
  });
};

module.exports = {
  createEmailTemplate,
  getEmailTemplates,
  getEmailTemplateById,
  getEmailTemplateByKey,
  updateEmailTemplateById,
  deleteEmailTemplateById,
  getActiveTemplates,
  replaceEmailTemplateById,
};