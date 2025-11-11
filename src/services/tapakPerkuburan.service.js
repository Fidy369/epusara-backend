const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const createTapakPerkuburan = async (data) => {
  return prisma.tapak_perkuburan.create({ 
    data,
    include: {
      zon_tapak_perkuburan: true,
      lot_kubur: true,
      user_tapak_perkuburan: true,
    }
  });
};

const getTapakPerkuburans = async (filter = {}, options = {}) => {
  const limit = parseInt(options.limit, 10) || 10;
  const page = parseInt(options.page, 10) || 1;
  const sortBy = options.sortBy || 'created_at:desc';
  const [sortField, sortOrder] = sortBy.split(':');

  const [totalResults, results] = await Promise.all([
    prisma.tapak_perkuburan.count({ where: filter }),
    prisma.tapak_perkuburan.findMany({
      where: filter,
      orderBy: { [sortField]: sortOrder },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        zon_tapak_perkuburan: true,
        lot_kubur: true,
        user_tapak_perkuburan: true,
      }
    }),
  ]);

  return {
    results,
    page,
    limit,
    totalResults,
  };
};

const getTapakPerkuburanById = async (id) => {
  return prisma.tapak_perkuburan.findUnique({ 
    where: { id: parseInt(id) },
    include: {
      zon_tapak_perkuburan: true,
      lot_kubur: true,
      user_tapak_perkuburan: true,
    }
  });
};

const updateTapakPerkuburanById = async (id, updateBody) => {
  return prisma.tapak_perkuburan.update({
    where: { id: parseInt(id) },
    data: updateBody,
    include: {
      zon_tapak_perkuburan: true,
      lot_kubur: true,
      user_tapak_perkuburan: true,
    }
  });
};

const deleteTapakPerkuburanById = async (id) => {
  return prisma.tapak_perkuburan.delete({ where: { id: parseInt(id) } });
};

module.exports = {
  createTapakPerkuburan,
  getTapakPerkuburans,
  getTapakPerkuburanById,
  updateTapakPerkuburanById,
  deleteTapakPerkuburanById,
};