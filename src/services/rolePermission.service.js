const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const assignPermissionToRole = async (roleId, permissionId, createdBy = 0) => {
  return prisma.role_permission.create({
    data: {
      role_id: roleId,
      permission_id: permissionId,
      created_by: createdBy,
      updated_by: createdBy,
    },
  });
};

const getRolePermissions = async (filter, options) => {
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy ?? 'created_at';
  const sortType = options.sortType ?? 'desc';

  return prisma.role_permission.findMany({
    where: filter,
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { [sortBy]: sortType },
    include: {
      role: true,
      permission: true,
    },
  });
};

const getPermissionsByRole = async (roleId) => {
  return prisma.role_permission.findMany({
    where: { role_id: roleId },
    include: { permission: true },
  });
};

const getRolesByPermission = async (permissionId) => {
  return prisma.role_permission.findMany({
    where: { permission_id: permissionId },
    include: { role: true },
  });
};

const removePermissionFromRole = async (roleId, permissionId) => {
  return prisma.role_permission.delete({
    where: {
      role_id_permission_id: {
        role_id: roleId,
        permission_id: permissionId,
      },
    },
  });
};

const bulkAssignPermissionsToRole = async (roleId, permissionIds, createdBy = 0) => {
  const assignments = permissionIds.map(permissionId => ({
    role_id: roleId,
    permission_id: permissionId,
    created_by: createdBy,
    updated_by: createdBy,
  }));

  return prisma.role_permission.createMany({
    data: assignments,
    skipDuplicates: true,
  });
};

const removeAllPermissionsFromRole = async (roleId) => {
  return prisma.role_permission.deleteMany({
    where: { role_id: roleId },
  });
};

module.exports = {
  assignPermissionToRole,
  getRolePermissions,
  getPermissionsByRole,
  getRolesByPermission,
  removePermissionFromRole,
  bulkAssignPermissionsToRole,
  removeAllPermissionsFromRole,
};