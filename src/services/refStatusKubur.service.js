const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const createRefStatusKubur = async (data) => {
  return prisma.ref_status_kubur.create({ data });
};

const getRefStatusKuburs = async (filter = {}, options = {}) => {
  const limit = parseInt(options.limit, 10) || 10;
  const page = parseInt(options.page, 10) || 1;
  const sortBy = options.sortBy || 'label_ms:asc';
  const [sortField, sortOrder] = sortBy.split(':');

  const [totalResults, results] = await Promise.all([
    prisma.ref_status_kubur.count({ where: filter }),
    prisma.ref_status_kubur.findMany({
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

const getRefStatusKuburByKod = async (kod) => {
  return prisma.ref_status_kubur.findUnique({ where: { kod_status_kubur: kod } });
};

const updateRefStatusKuburByKod = async (kod, updateBody) => {
  return prisma.ref_status_kubur.update({
    where: { kod_status_kubur: kod },
    data: updateBody,
  });
};

const deleteRefStatusKuburByKod = async (kod) => {
  return prisma.ref_status_kubur.delete({ where: { kod_status_kubur: kod } });
};

const replaceRefStatusKuburByKod = async (kod, updateBody) => {
  const refStatusKubur = await prisma.ref_status_kubur.findUnique({
    where: { kod_status_kubur: kod },
  });

  if (!refStatusKubur) {
    throw new Error('Reference status kubur not found');
  }

  return prisma.ref_status_kubur.update({
    where: { kod_status_kubur: kod },
    data: {
      label_ms: updateBody.label_ms,
      label_en: updateBody.label_en,
      color: updateBody.color,
      is_active: updateBody.is_active,
      updated_by: updateBody.updated_by,
      updated_at: new Date(),
    },
  });
};

module.exports = {
  createRefStatusKubur,
  getRefStatusKuburs,
  replaceRefStatusKuburByKod,
  getRefStatusKuburByKod,
  updateRefStatusKuburByKod,
  deleteRefStatusKuburByKod,
};