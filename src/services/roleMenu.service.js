const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const assignMenuToRole = async (roleId, menuId, createdBy = 0) => {
  return prisma.role_menu.create({
    data: {
      role_id: roleId,
      menu_id: menuId,
      created_by: createdBy,
      updated_by: createdBy,
    },
  });
};

const getRoleMenus = async (filter, options) => {
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy ?? 'created_at';
  const sortType = options.sortType ?? 'desc';

  return prisma.role_menu.findMany({
    where: filter,
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { [sortBy]: sortType },
    include: {
      role: true,
      menu: true,
    },
  });
};

const getMenusByRole = async (roleId) => {
  return prisma.role_menu.findMany({
    where: { role_id: roleId },
    include: { menu: true },
  });
};

const getRolesByMenu = async (menuId) => {
  return prisma.role_menu.findMany({
    where: { menu_id: menuId },
    include: { role: true },
  });
};

const removeMenuFromRole = async (roleId, menuId) => {
  return prisma.role_menu.delete({
    where: {
      menu_id_role_id: {
        role_id: roleId,
        menu_id: menuId,
      },
    },
  });
};

const bulkAssignMenusToRole = async (roleId, menuIds, createdBy = 0) => {
  const assignments = menuIds.map(menuId => ({
    role_id: roleId,
    menu_id: menuId,
    created_by: createdBy,
    updated_by: createdBy,
  }));

  return prisma.role_menu.createMany({
    data: assignments,
    skipDuplicates: true,
  });
};

const removeAllMenusFromRole = async (roleId) => {
  return prisma.role_menu.deleteMany({
    where: { role_id: roleId },
  });
};

const replaceRoleMenus = async (roleId, menuIds, updatedBy = 0) => {
  // Use transaction to ensure atomicity
  return prisma.$transaction(async (tx) => {
    // First, delete all existing menu assignments for this role
    await tx.role_menu.deleteMany({
      where: { role_id: roleId },
    });

    // Then, create new assignments
    const assignments = menuIds.map(menuId => ({
      role_id: roleId,
      menu_id: menuId,
      created_by: updatedBy,
      updated_by: updatedBy,
    }));

    await tx.role_menu.createMany({
      data: assignments,
    });

    // Return the new assignments
    return tx.role_menu.findMany({
      where: { role_id: roleId },
      include: { menu: true },
    });
  });
};

module.exports = {
  assignMenuToRole,
  getRoleMenus,
  getMenusByRole,
  replaceRoleMenus,
  getRolesByMenu,
  removeMenuFromRole,
  bulkAssignMenusToRole,
  removeAllMenusFromRole,
};