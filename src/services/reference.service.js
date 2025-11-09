const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/**
 * Get all burial status codes
 * @returns {Promise<Array>}
 */
const getBurialStatuses = async () => {
  return prisma.ref_status_kubur.findMany({
    where: { is_active: true }
  });
};

/**
 * Get all deceased categories
 * @returns {Promise<Array>}
 */
const getDeceasedCategories = async () => {
  return prisma.ref_kategori_jenazah.findMany({
    where: { flag_aktif: 1 }
  });
};

module.exports = {
  getBurialStatuses,
  getDeceasedCategories,
};