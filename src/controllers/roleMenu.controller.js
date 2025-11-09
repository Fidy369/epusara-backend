const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { roleMenuService } = require('../services');

const assignMenuToRole = catchAsync(async (req, res) => {
  const roleMenu = await roleMenuService.assignMenuToRole(req.body.role_id, req.body.menu_id, req.body.created_by, req.body.updated_by);
  res.status(httpStatus.CREATED).send(roleMenu);
});

const getRoleMenus = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['role_id', 'menu_id']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'sortType']);
  const result = await roleMenuService.getRoleMenus(filter, options);
  res.send(result);
});

const getMenusByRole = catchAsync(async (req, res) => {
  const result = await roleMenuService.getMenusByRole(parseInt(req.params.roleId));
  res.send(result);
});

const getRolesByMenu = catchAsync(async (req, res) => {
  const result = await roleMenuService.getRolesByMenu(parseInt(req.params.menuId));
  res.send(result);
});

const removeMenuFromRole = catchAsync(async (req, res) => {
  await roleMenuService.removeMenuFromRole(parseInt(req.params.roleId), parseInt(req.params.menuId));
  res.status(httpStatus.NO_CONTENT).send();
});

const bulkAssignMenusToRole = catchAsync(async (req, res) => {
  const result = await roleMenuService.bulkAssignMenusToRole(req.body.role_id, req.body.menu_ids, req.body.created_by, req.body.updated_by);
  res.send(result);
});

const removeAllMenusFromRole = catchAsync(async (req, res) => {
  await roleMenuService.removeAllMenusFromRole(parseInt(req.params.roleId));
  res.status(httpStatus.NO_CONTENT).send();
});

const replaceRoleMenus = catchAsync(async (req, res) => {
  const result = await roleMenuService.replaceRoleMenus(
    parseInt(req.params.roleId), 
    req.body.menu_ids, 
    req.body.updated_by
  );
  res.send(result);
});

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