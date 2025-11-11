const { PrismaClient } = require('@prisma/client');
const httpStatus = require('http-status').default;
const ApiError = require('../utils/ApiError');

const prisma = new PrismaClient();

/**
 * Assign role to user
 */
const assignRoleToUser = async (userId, roleId) => {
  const existing = await prisma.user_role.findFirst({
    where: { user_id: userId, role_id: roleId }
  });
  
  if (existing) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User already has this role');
  }

  return prisma.user_role.create({
    data: { user_id: userId, role_id: roleId },
    include: {
      users: true,
      role: true
    }
  });
};

/**
 * Query user role assignments
 */
const queryUserRoleAssignments = async (filter = {}, options = {}) => {
  const limit = parseInt(options.limit, 10) || 10;
  const page = parseInt(options.page, 10) || 1;
  const sortBy = options.sortBy || 'created_at:desc';
  const [sortField, sortOrder] = sortBy.split(':');

  const [totalResults, results] = await Promise.all([
    prisma.user_role.count({ where: filter }),
    prisma.user_role.findMany({
      where: filter,
      orderBy: { [sortField]: sortOrder },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        users: true,
        role: true
      }
    }),
  ]);

  return { results, page, limit, totalResults };
};

/**
 * Get roles by user
 */
const getRolesByUser = async (userId) => {
  return prisma.user_role.findMany({
    where: { user_id: userId },
    include: {
      role: true
    }
  });
};

/**
 * Get users by role
 */
const getUsersByRole = async (roleId) => {
  return prisma.user_role.findMany({
    where: { role_id: roleId },
    include: {
      users: {
        include: {
          user_profile: true
        }
      }
    }
  });
};

/**
 * Remove role from user
 */
const removeRoleFromUser = async (userId, roleId) => {
  const assignment = await prisma.user_role.findFirst({
    where: { user_id: userId, role_id: roleId }
  });

  if (!assignment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User role assignment not found');
  }

  return prisma.user_role.delete({
    where: {
      user_id_role_id: {
        user_id: userId,
        role_id: roleId
      }
    }
  });
};

/**
 * Remove all roles from user
 */
const removeAllRolesFromUser = async (userId) => {
  return prisma.user_role.deleteMany({
    where: { user_id: userId }
  });
};

/**
 * Remove all users from role
 */
const removeAllUsersFromRole = async (roleId) => {
  return prisma.user_role.deleteMany({
    where: { role_id: roleId }
  });
};

module.exports = {
  assignRoleToUser,
  queryUserRoleAssignments,
  getRolesByUser,
  getUsersByRole,
  removeRoleFromUser,
  removeAllRolesFromUser,
  removeAllUsersFromRole,
};