const httpStatus = require('http-status').default;
const { PrismaClient } = require('@prisma/client');
const ApiError = require('../utils/ApiError');

const prisma = new PrismaClient();

/**
 * Create a role
 * @param {Object} roleBody
 * @returns {Promise<Role>}
 */
const createRole = async (roleBody) => {
  const existing = await prisma.role.findFirst({ where: { name: roleBody.name } });
  if (existing) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Role name already exists');
  }
  return prisma.role.create({ data: roleBody });
};

/**
 * Query for roles
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<QueryResult>}
 */
const queryRoles = async (filter = {}, options = {}) => {
  const limit = parseInt(options.limit, 10) || 10;
  const page = parseInt(options.page, 10) || 1;
  const sortBy = options.sortBy || 'created_at:desc';
  const [sortField, sortOrder] = sortBy.split(':');

  const [totalResults, results] = await Promise.all([
    prisma.role.count({ where: filter }),
    prisma.role.findMany({
      where: filter,
      orderBy: { [sortField]: sortOrder },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        role_permission: {
          include: {
            permission: true
          }
        }
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

/**
 * Get role by id
 * @param {number} id
 * @returns {Promise<Role>}
 */
const getRoleById = async (id) => {
  return prisma.role.findUnique({ 
    where: { id },
    include: {
      role_permission: {
        include: {
          permission: true
        }
      }
    }
  });
};

/**
 * Update role by id
 * @param {number} roleId
 * @param {Object} updateBody
 * @returns {Promise<Role>}
 */
const updateRoleById = async (roleId, updateBody) => {
  const role = await getRoleById(roleId);
  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Role not found');
  }
  
  if (updateBody.name) {
    const nameExists = await prisma.role.findFirst({
      where: { name: updateBody.name, id: { not: roleId } }
    });
    if (nameExists) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Role name already exists');
    }
  }

  return prisma.role.update({
    where: { id: roleId },
    data: updateBody,
  });
};

/**
 * Delete role by id
 * @param {number} roleId
 * @returns {Promise<Role>}
 */
const deleteRoleById = async (roleId) => {
  const role = await getRoleById(roleId);
  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Role not found');
  }
  return prisma.role.delete({ where: { id: roleId } });
};

module.exports = {
  createRole,
  queryRoles,
  getRoleById,
  updateRoleById,
  deleteRoleById,
};