const httpStatus = require('http-status').default;
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const { menuService } = require('../services');

const createMenu = catchAsync(async (req, res) => {
  const menu = await menuService.createMenu(req.body);
  res.status(httpStatus.CREATED).send(menu);
});

const getMenuHierarchy = catchAsync(async (req, res) => {
  const menus = await menuService.getMenuHierarchy();
  res.send(menus);
});

const getUserMenu = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const menus = await menuService.getUserMenuByRole(userId);
  res.send(menus);
});

const queryMenus = catchAsync(async (req, res) => {
  const filter = {};
  const options = {
    sortBy: req.query.sortBy,
    limit: req.query.limit,
    page: req.query.page,
  };

  if (req.query.parent_id) filter.parent_id = parseInt(req.query.parent_id);
  if (req.query.status) filter.status = parseInt(req.query.status);
  if (req.query.name) filter.name = { contains: req.query.name };

  const result = await menuService.queryMenus(filter, options);
  res.send(result);
});

const getMenu = catchAsync(async (req, res) => {
  const menu = await menuService.getMenuById(parseInt(req.params.menuId));
  if (!menu) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Menu not found');
  }
  res.send(menu);
});

const updateMenu = catchAsync(async (req, res) => {
  const menu = await menuService.updateMenuById(parseInt(req.params.menuId), req.body);
  res.send(menu);
});

const deleteMenu = catchAsync(async (req, res) => {
  await menuService.deleteMenuById(parseInt(req.params.menuId));
  res.status(httpStatus.NO_CONTENT).send();
});

const assignMenuToRole = catchAsync(async (req, res) => {
  const { roleId, menuId } = req.body;
  const assignment = await menuService.assignMenuToRole(roleId, menuId);
  res.status(httpStatus.CREATED).send(assignment);
});

const removeMenuFromRole = catchAsync(async (req, res) => {
  const { roleId, menuId } = req.body;
  await menuService.removeMenuFromRole(roleId, menuId);
  res.status(httpStatus.NO_CONTENT).send();
});

const putMenu = catchAsync(async (req, res) => {
  const menu = await menuService.updateMenuById(parseInt(req.params.menuId), req.body);
  res.send(menu);
});

module.exports = {
  createMenu,
  getMenuHierarchy,
  getUserMenu,
  queryMenus,
  getMenu,
  putMenu,
  updateMenu,
  deleteMenu,
  assignMenuToRole,
  removeMenuFromRole,
};