const { PrismaClient } = require('@prisma/client');
const httpStatus = require('http-status').default;
const ApiError = require('../utils/ApiError');

const prisma = new PrismaClient();

/**
 * Create menu item
 * @param {Object} menuData
 * @returns {Promise<Menu>}
 */
const createMenu = async (menuData) => {
  return prisma.menu.create({
    data: menuData,
    include: {
      menu: true,
      other_menu: true
    }
  });
};

/**
 * Get menu hierarchy
 * @returns {Promise<Array>}
 */
const getMenuHierarchy = async () => {
  const menus = await prisma.menu.findMany({
    where: { status: 1 },
    orderBy: { order: 'asc' },
    include: {
      other_menu: {
        where: { status: 1 },
        orderBy: { order: 'asc' }
      }
    }
  });

  return menus.filter(menu => !menu.parent_id);
};

/**
 * Get user menu by role
 * @param {number} userId
 * @returns {Promise<Array>}
 */
const getUserMenuByRole = async (userId) => {
  const userRoles = await prisma.user_role.findMany({
    where: { user_id: userId },
    include: {
      role: {
        include: {
          role_menu: {
            include: {
              menu: {
                include: {
                  other_menu: {
                    where: { status: 1 },
                    orderBy: { order: 'asc' }
                  }
                }
              }
            }
          }
        }
      }
    }
  });

  const menuIds = new Set();
  userRoles.forEach(userRole => {
    userRole.role.role_menu.forEach(roleMenu => {
      if (roleMenu.menu.status === 1) {
        menuIds.add(roleMenu.menu.id);
      }
    });
  });

  const menus = await prisma.menu.findMany({
    where: {
      id: { in: Array.from(menuIds) },
      status: 1
    },
    orderBy: { order: 'asc' },
    include: {
      other_menu: {
        where: { status: 1 },
        orderBy: { order: 'asc' }
      }
    }
  });

  return menus.filter(menu => !menu.parent_id);
};

/**
 * Query menus
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<QueryResult>}
 */
const queryMenus = async (filter = {}, options = {}) => {
  const limit = parseInt(options.limit, 10) || 10;
  const page = parseInt(options.page, 10) || 1;
  const sortBy = options.sortBy || 'order:asc';
  const [sortField, sortOrder] = sortBy.split(':');

  const [totalResults, results] = await Promise.all([
    prisma.menu.count({ where: filter }),
    prisma.menu.findMany({
      where: filter,
      orderBy: { [sortField]: sortOrder },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        menu: true,
        other_menu: true
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
 * Get menu by id
 * @param {number} id
 * @returns {Promise<Menu>}
 */
const getMenuById = async (id) => {
  return prisma.menu.findUnique({
    where: { id },
    include: {
      menu: true,
      other_menu: true
    }
  });
};

/**
 * Update menu by id
 * @param {number} menuId
 * @param {Object} updateData
 * @returns {Promise<Menu>}
 */
const updateMenuById = async (menuId, updateData) => {
  const menu = await getMenuById(menuId);
  if (!menu) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Menu not found');
  }

  return prisma.menu.update({
    where: { id: menuId },
    data: updateData
  });
};

/**
 * Delete menu by id
 * @param {number} menuId
 * @returns {Promise<Menu>}
 */
const deleteMenuById = async (menuId) => {
  const menu = await getMenuById(menuId);
  if (!menu) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Menu not found');
  }

  // Check if menu has children
  const hasChildren = await prisma.menu.count({
    where: { parent_id: menuId }
  });

  if (hasChildren > 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Cannot delete menu with children');
  }

  return prisma.menu.delete({ where: { id: menuId } });
};

/**
 * Assign menu to role
 * @param {number} roleId
 * @param {number} menuId
 * @returns {Promise<RoleMenu>}
 */
const assignMenuToRole = async (roleId, menuId) => {
  // Check if assignment already exists
  const existing = await prisma.role_menu.findFirst({
    where: { role_id: roleId, menu_id: menuId }
  });

  if (existing) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Menu already assigned to role');
  }

  return prisma.role_menu.create({
    data: { role_id: roleId, menu_id: menuId }
  });
};

/**
 * Remove menu from role
 * @param {number} roleId
 * @param {number} menuId
 * @returns {Promise<RoleMenu>}
 */
const removeMenuFromRole = async (roleId, menuId) => {
  const roleMenu = await prisma.role_menu.findFirst({
    where: { role_id: roleId, menu_id: menuId }
  });

  if (!roleMenu) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Menu assignment not found');
  }

  return prisma.role_menu.delete({
    where: {
      menu_id_role_id: {
        menu_id: menuId,
        role_id: roleId
      }
    }
  });
};

module.exports = {
  createMenu,
  getMenuHierarchy,
  getUserMenuByRole,
  queryMenus,
  getMenuById,
  updateMenuById,
  deleteMenuById,
  assignMenuToRole,
  removeMenuFromRole,
};