const httpStatus = require('http-status').default;
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { permissionService } = require('../services');

const createPermission = catchAsync(async (req, res) => {
  const permission = await permissionService.createPermission(req.body);
  res.status(httpStatus.CREATED).send(permission);
});

const getPermissions = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await permissionService.queryPermissions(filter, options);
  res.send(result);
});

const getPermission = catchAsync(async (req, res) => {
  const permission = await permissionService.getPermissionById(parseInt(req.params.permissionId));
  if (!permission) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Permission not found');
  }
  res.send(permission);
});

const updatePermission = catchAsync(async (req, res) => {
  const permission = await permissionService.updatePermissionById(parseInt(req.params.permissionId), req.body);
  res.send(permission);
});

const deletePermission = catchAsync(async (req, res) => {
  await permissionService.deletePermissionById(parseInt(req.params.permissionId));
  res.status(httpStatus.NO_CONTENT).send();
});

const assignPermissionToRole = catchAsync(async (req, res) => {
  const rolePermission = await permissionService.assignPermissionToRole(
    parseInt(req.params.roleId),
    parseInt(req.params.permissionId)
  );
  res.status(httpStatus.CREATED).send(rolePermission);
});

const removePermissionFromRole = catchAsync(async (req, res) => {
  await permissionService.removePermissionFromRole(
    parseInt(req.params.roleId),
    parseInt(req.params.permissionId)
  );
  res.status(httpStatus.NO_CONTENT).send();
});

const putPermission = catchAsync(async (req, res) => {
  const permission = await permissionService.replacePermissionById(
    parseInt(req.params.permissionId), 
    req.body
  );
  res.send(permission);
});

module.exports = {
  createPermission,
  getPermissions,
  getPermission,
  putPermission,
  updatePermission,
  deletePermission,
  assignPermissionToRole,
  removePermissionFromRole,
};