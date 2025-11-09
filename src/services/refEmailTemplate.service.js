const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createRefEmailTemplate = async (data) => {
  return prisma.ref_email_template.create({
    data,
  });
};

const getRefEmailTemplates = async (filter = {}, options = {}) => {
  const limit = parseInt(options.limit, 10) || 10;
  const page = parseInt(options.page, 10) || 1;
  const sortBy = options.sortBy || 'created_at:desc';
  const [sortField, sortOrder] = sortBy.split(':');

  const [totalResults, results] = await Promise.all([
    prisma.ref_email_template.count({ where: filter }),
    prisma.ref_email_template.findMany({
      where: filter,
      orderBy: { [sortField]: sortOrder },
      skip: (page - 1) * limit,
      take: limit,
    }),
  ]);

  return {
    results,
    page,
    limit,
    totalResults,
  };
};

const getRefEmailTemplateById = async (id) => {
  return prisma.ref_email_template.findUnique({ where: { id: parseInt(id) } });
};

const getRefEmailTemplateByKod = async (kodEmailTemplate) => {
  return prisma.ref_email_template.findUnique({
    where: { kod_email_template: kodEmailTemplate },
  });
};

const updateRefEmailTemplateById = async (id, updateBody) => {
  return prisma.ref_email_template.update({
    where: { id: parseInt(id) },
    data: updateBody,
  });
};

const deleteRefEmailTemplateById = async (id) => {
  return prisma.ref_email_template.delete({ where: { id: parseInt(id) } });
};

const getActiveTemplates = async () => {
  return prisma.ref_email_template.findMany({
    where: { is_active: true },
    orderBy: { created_at: 'desc' },
  });
};

const replaceRefEmailTemplateById = async (id, replaceBody) => {
  const emailTemplate = await getRefEmailTemplateById(id);
  if (!emailTemplate) {
    throw new Error('Reference email template not found');
  }
  
  // Full replacement - all fields required
  const updateData = {
    kod_email_template: replaceBody.kod_email_template,
    description: replaceBody.description,
    title: replaceBody.title,
    content: replaceBody.content,
    is_active: replaceBody.is_active ?? false,
    updated_by: replaceBody.updated_by ?? 0,
  };

  return prisma.ref_email_template.update({
    where: { id: parseInt(id) },
    data: updateData,
  });
};

module.exports = {
  createRefEmailTemplate,
  getRefEmailTemplates,
  getRefEmailTemplateByKod,
  getActiveTemplates,
  replaceRefEmailTemplateById,
  getRefEmailTemplateById,
  updateRefEmailTemplateById,
  deleteRefEmailTemplateById,
};