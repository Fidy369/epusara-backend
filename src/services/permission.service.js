const httpStatus = require('http-status').default;
const { PrismaClient } = require('@prisma/client');
const ApiError = require('../utils/ApiError');

const prisma = new PrismaClient();

/**
 * Create a permission
 * @param {Object} permissionBody
 * @returns {Promise<Permission>}
 */
const createPermission = async (permissionBody) => {
  const existing = await prisma.permission.findFirst({ where: { name: permissionBody.name } });
  if (existing) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Permission name already exists');
  }
  return prisma.permission.create({ data: permissionBody });
};

/**
 * Query for permissions
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<QueryResult>}
 */
const queryPermissions = async (filter = {}, options = {}) => {
  const limit = parseInt(options.limit, 10) || 10;
  const page = parseInt(options.page, 10) || 1;
  const sortBy = options.sortBy || 'created_at:desc';
  const [sortField, sortOrder] = sortBy.split(':');

  const [totalResults, results] = await Promise.all([
    prisma.permission.count({ where: filter }),
    prisma.permission.findMany({
      where: filter,
      orderBy: { [sortField]: sortOrder },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        role_permission: {
          include: {
            role: true
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
 * Get permission by id
 * @param {number} id
 * @returns {Promise<Permission>}
 */
const getPermissionById = async (id) => {
  return prisma.permission.findUnique({ 
    where: { id },
    include: {
      role_permission: {
        include: {
          role: true
        }
      }
    }
  });
};

/**
 * Update permission by id
 * @param {number} permissionId
 * @param {Object} updateBody
 * @returns {Promise<Permission>}
 */
const updatePermissionById = async (permissionId, updateBody) => {
  const permission = await getPermissionById(permissionId);
  if (!permission) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Permission not found');
  }
  
  if (updateBody.name) {
    const nameExists = await prisma.permission.findFirst({
      where: { name: updateBody.name, id: { not: permissionId } }
    });
    if (nameExists) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Permission name already exists');
    }
  }

  return prisma.permission.update({
    where: { id: permissionId },
    data: updateBody,
  });
};

/**
 * Delete permission by id
 * @param {number} permissionId
 * @returns {Promise<Permission>}
 */
const deletePermissionById = async (permissionId) => {
  const permission = await getPermissionById(permissionId);
  if (!permission) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Permission not found');
  }
  return prisma.permission.delete({ where: { id: permissionId } });
};

/**
 * Assign permission to role
 * @param {number} roleId
 * @param {number} permissionId
 * @returns {Promise<RolePermission>}
 */
const assignPermissionToRole = async (roleId, permissionId) => {
  // Check if role exists
  const role = await prisma.role.findUnique({ where: { id: roleId } });
  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Role not found');
  }

  // Check if permission exists
  const permission = await getPermissionById(permissionId);
  if (!permission) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Permission not found');
  }

  // Check if already assigned
  const existing = await prisma.role_permission.findFirst({
    where: { role_id: roleId, permission_id: permissionId }
  });
  if (existing) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Permission already assigned to role');
  }

  return prisma.role_permission.create({
    data: { role_id: roleId, permission_id: permissionId }
  });
};

/**
 * Remove permission from role
 * @param {number} roleId
 * @param {number} permissionId
 * @returns {Promise<RolePermission>}
 */
const removePermissionFromRole = async (roleId, permissionId) => {
  const rolePermission = await prisma.role_permission.findFirst({
    where: { role_id: roleId, permission_id: permissionId }
  });
  
  if (!rolePermission) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Permission not assigned to role');
  }

  return prisma.role_permission.delete({
    where: { role_id_permission_id: { role_id: roleId, permission_id: permissionId } }
  });
};

module.exports = {
  createPermission,
  queryPermissions,
  getPermissionById,
  updatePermissionById,
  deletePermissionById,
  assignPermissionToRole,
  removePermissionFromRole,
};