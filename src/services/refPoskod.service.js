const httpStatus = require('http-status').default;
const { PrismaClient } = require('@prisma/client');
const ApiError = require('../utils/ApiError');

const prisma = new PrismaClient();

const createPostalCode = async (postalCodeBody) => {
  return prisma.ref_poskod.create({
    data: postalCodeBody,
    include: { ref_negeri: true }
  });
};

const queryPostalCodes = async (filter = {}, options = {}) => {
  const limit = parseInt(options.limit, 10) || 10;
  const page = parseInt(options.page, 10) || 1;
  const sortBy = options.sortBy || 'poskod:asc';
  const [sortField, sortOrder] = sortBy.split(':');

  const [totalResults, results] = await Promise.all([
    prisma.ref_poskod.count({ where: filter }),
    prisma.ref_poskod.findMany({
      where: filter,
      orderBy: { [sortField]: sortOrder },
      skip: (page - 1) * limit,
      take: limit,
      include: { ref_negeri: true }
    }),
  ]);

  return {
    results,
    page,
    limit,
    totalResults,
  };
};

const getPostalCodeById = async (id) => {
  return prisma.ref_poskod.findUnique({ 
    where: { id },
    include: { ref_negeri: true }
  });
};

const getPostalCodeByCode = async (poskod) => {
  return prisma.ref_poskod.findFirst({
    where: { poskod },
    include: { ref_negeri: true }
  });
};

const getActivePostalCodes = async () => {
  return prisma.ref_poskod.findMany({
    where: { is_active: true },
    orderBy: { poskod: 'asc' },
    include: { ref_negeri: true }
  });
};

const getPostalCodesByState = async (stateCode) => {
  return prisma.ref_poskod.findMany({
    where: { 
      kod_negeri: stateCode,
      is_active: true 
    },
    orderBy: { poskod: 'asc' },
    include: { ref_negeri: true }
  });
};

const updatePostalCodeById = async (id, updateBody) => {
  const postalCode = await getPostalCodeById(id);
  if (!postalCode) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Postal code not found');
  }

  return prisma.ref_poskod.update({
    where: { id },
    data: updateBody,
    include: { ref_negeri: true }
  });
};

const deletePostalCodeById = async (id) => {
  const postalCode = await getPostalCodeById(id);
  if (!postalCode) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Postal code not found');
  }

  return prisma.ref_poskod.delete({ where: { id } });
};

module.exports = {
  createPostalCode,
  queryPostalCodes,
  getPostalCodeById,
  getPostalCodeByCode,
  getActivePostalCodes,
  getPostalCodesByState,
  updatePostalCodeById,
  deletePostalCodeById,
};