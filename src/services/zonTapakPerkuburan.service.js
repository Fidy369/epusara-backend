const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const createZonTapakPerkuburan = async (data) => {
  return prisma.zon_tapak_perkuburan.create({ 
    data,
    include: {
      tapak_perkuburan: true,
      ref_kategori_jenazah: true,
      lot_kubur: true,
    }
  });
};

const getZonTapakPerkuburans = async (filter = {}, options = {}) => {
  const limit = parseInt(options.limit, 10) || 10;
  const page = parseInt(options.page, 10) || 1;
  const sortBy = options.sortBy || 'created_at:desc';
  const [sortField, sortOrder] = sortBy.split(':');

  const [totalResults, results] = await Promise.all([
    prisma.zon_tapak_perkuburan.count({ where: filter }),
    prisma.zon_tapak_perkuburan.findMany({
      where: filter,
      orderBy: { [sortField]: sortOrder },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        tapak_perkuburan: true,
        ref_kategori_jenazah: true,
        lot_kubur: true,
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

const getZonTapakPerkuburanById = async (id) => {
  return prisma.zon_tapak_perkuburan.findUnique({ 
    where: { id: parseInt(id) },
    include: {
      tapak_perkuburan: true,
      ref_kategori_jenazah: true,
      lot_kubur: true,
    }
  });
};

const updateZonTapakPerkuburanById = async (id, updateBody) => {
  return prisma.zon_tapak_perkuburan.update({
    where: { id: parseInt(id) },
    data: updateBody,
    include: {
      tapak_perkuburan: true,
      ref_kategori_jenazah: true,
      lot_kubur: true,
    }
  });
};

const deleteZonTapakPerkuburanById = async (id) => {
  return prisma.zon_tapak_perkuburan.delete({ where: { id: parseInt(id) } });
};

const replaceZonTapakPerkuburanById = async (id, replaceBody) => {
  const zonExists = await prisma.zon_tapak_perkuburan.findUnique({ 
    where: { id: parseInt(id) } 
  });
  
  if (!zonExists) {
    throw new Error('Zon tapak perkuburan not found');
  }

  return prisma.zon_tapak_perkuburan.update({
    where: { id: parseInt(id) },
    data: {
      tapak_perkuburan_id: replaceBody.tapak_perkuburan_id,
      nama_zon: replaceBody.nama_zon || '',
      ref_kategori_jenazah_id: replaceBody.ref_kategori_jenazah_id || 0,
      keluasan_zon: replaceBody.keluasan_zon || 0,
      kapasiti_lot_keseluruhan: replaceBody.kapasiti_lot_keseluruhan || 0,
      updated_by: replaceBody.updated_by || 0,
      updated_at: new Date(),
    },
    include: {
      tapak_perkuburan: true,
      ref_kategori_jenazah: true,
      lot_kubur: true,
    }
  });
};

module.exports = {
  createZonTapakPerkuburan,
  getZonTapakPerkuburans,
  getZonTapakPerkuburanById,
  replaceZonTapakPerkuburanById,
  updateZonTapakPerkuburanById,
  deleteZonTapakPerkuburanById,
};