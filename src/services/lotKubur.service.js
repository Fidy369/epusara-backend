const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const createLotKubur = async (data) => {
  return prisma.lot_kubur.create({ 
    data,
    include: {
      tapak_perkuburan: true,
      zon_tapak_perkuburan: true,
      ref_kategori_jenazah: true,
      ref_status_kubur: true,
    }
  });
};

const getLotKuburs = async (filter = {}, options = {}) => {
  const limit = parseInt(options.limit, 10) || 10;
  const page = parseInt(options.page, 10) || 1;
  const sortBy = options.sortBy || 'created_at:desc';
  const [sortField, sortOrder] = sortBy.split(':');

  const [totalResults, results] = await Promise.all([
    prisma.lot_kubur.count({ where: filter }),
    prisma.lot_kubur.findMany({
      where: filter,
      orderBy: { [sortField]: sortOrder },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        tapak_perkuburan: true,
        zon_tapak_perkuburan: true,
        ref_kategori_jenazah: true,
        ref_status_kubur: true,
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

const getLotKuburById = async (id) => {
  return prisma.lot_kubur.findUnique({ 
    where: { id: parseInt(id) },
    include: {
      tapak_perkuburan: true,
      zon_tapak_perkuburan: true,
      ref_kategori_jenazah: true,
      ref_status_kubur: true,
    }
  });
};

const updateLotKuburById = async (id, updateBody) => {
  return prisma.lot_kubur.update({
    where: { id: parseInt(id) },
    data: updateBody,
    include: {
      tapak_perkuburan: true,
      zon_tapak_perkuburan: true,
      ref_kategori_jenazah: true,
      ref_status_kubur: true,
    }
  });
};

const deleteLotKuburById = async (id) => {
  return prisma.lot_kubur.delete({ where: { id: parseInt(id) } });
};

const replaceLotKuburById = async (id, replaceBody) => {
  const lotKubur = await prisma.lot_kubur.findUnique({ 
    where: { id: parseInt(id) } 
  });
  
  if (!lotKubur) {
    throw new Error('Lot kubur not found');
  }

  return prisma.lot_kubur.update({
    where: { id: parseInt(id) },
    data: replaceBody,
    include: {
      tapak_perkuburan: true,
      zon_tapak_perkuburan: true,
      ref_kategori_jenazah: true,
      ref_status_kubur: true,
    }
  });
};

module.exports = {
  createLotKubur,
  getLotKuburs,
  getLotKuburById,
  updateLotKuburById,
  replaceLotKuburById,
  deleteLotKuburById,
};