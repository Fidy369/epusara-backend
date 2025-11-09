const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { rolePermissionService } = require('../services');

const assignPermissionToRole = catchAsync(async (req, res) => {
  const rolePermission = await rolePermissionService.assignPermissionToRole(req.body.role_id, req.body.permission_id, req.body.created_by, req.body.updated_by);
  res.status(httpStatus.CREATED).send(rolePermission);
});

const getRolePermissions = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['role_id', 'permission_id']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'sortType']);
  const result = await rolePermissionService.getRolePermissions(filter, options);
  res.send(result);
});

const getPermissionsByRole = catchAsync(async (req, res) => {
  const result = await rolePermissionService.getPermissionsByRole(parseInt(req.params.roleId));
  res.send(result);
});

const getRolesByPermission = catchAsync(async (req, res) => {
  const result = await rolePermissionService.getRolesByPermission(parseInt(req.params.permissionId));
  res.send(result);
});

const removePermissionFromRole = catchAsync(async (req, res) => {
  await rolePermissionService.removePermissionFromRole(parseInt(req.params.roleId), parseInt(req.params.permissionId));
  res.status(httpStatus.NO_CONTENT).send();
});

const bulkAssignPermissionsToRole = catchAsync(async (req, res) => {
  const result = await rolePermissionService.bulkAssignPermissionsToRole(req.body.role_id, req.body.permission_ids, req.body.created_by, req.body.updated_by);
  res.send(result);
});

const removeAllPermissionsFromRole = catchAsync(async (req, res) => {
  await rolePermissionService.removeAllPermissionsFromRole(parseInt(req.params.roleId));
  res.status(httpStatus.NO_CONTENT).send();
});

const replaceRolePermissions = catchAsync(async (req, res) => {
  const result = await rolePermissionService.replaceRolePermissions(
    parseInt(req.params.roleId), 
    req.body.permission_ids, 
    req.body.updated_by
  );
  res.send(result);
});

module.exports = {
  assignPermissionToRole,
  getRolePermissions,
  getPermissionsByRole,
  replaceRolePermissions,
  getRolesByPermission,
  removePermissionFromRole,
  bulkAssignPermissionsToRole,
  removeAllPermissionsFromRole,
};