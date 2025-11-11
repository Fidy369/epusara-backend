const { PrismaClient } = require('@prisma/client');
const ApiError = require('../utils/ApiError');

const prisma = new PrismaClient();

const assignUserToSite = async (data) => {
  return prisma.user_tapak_perkuburan.create({ 
    data,
    include: {
      users: true,
      tapak_perkuburan: true,
    }
  });
};

const getUserSiteAssignments = async (filter = {}, options = {}) => {
  const limit = parseInt(options.limit, 10) || 10;
  const page = parseInt(options.page, 10) || 1;
  const sortBy = options.sortBy || 'created_at:desc';
  const [sortField, sortOrder] = sortBy.split(':');

  const [totalResults, results] = await Promise.all([
    prisma.user_tapak_perkuburan.count({ where: filter }),
    prisma.user_tapak_perkuburan.findMany({
      where: filter,
      orderBy: { [sortField]: sortOrder },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        users: true,
        tapak_perkuburan: true,
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

const getUserSiteAssignmentById = async (userId, siteId) => {
  return prisma.user_tapak_perkuburan.findUnique({ 
    where: { 
      user_id_tapak_perkuburan_id: {
        user_id: parseInt(userId),
        tapak_perkuburan_id: parseInt(siteId)
      }
    },
    include: {
      users: true,
      tapak_perkuburan: true,
    }
  });
};

const removeUserFromSite = async (userId, siteId) => {
  return prisma.user_tapak_perkuburan.delete({ 
    where: { 
      user_id_tapak_perkuburan_id: {
        user_id: parseInt(userId),
        tapak_perkuburan_id: parseInt(siteId)
      }
    }
  });
};

module.exports = {
  assignUserToSite,
  getUserSiteAssignments,
  getUserSiteAssignmentById,
  removeUserFromSite,
};