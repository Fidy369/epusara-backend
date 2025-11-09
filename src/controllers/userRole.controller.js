const httpStatus = require('http-status').default;
const catchAsync = require('../utils/catchAsync');
const { userRoleService } = require('../services');

const assignRoleToUser = catchAsync(async (req, res) => {
  const { user_id, role_id } = req.body;
  const assignment = await userRoleService.assignRoleToUser(user_id, role_id);
  res.status(httpStatus.CREATED).send(assignment);
});

const queryUserRoleAssignments = catchAsync(async (req, res) => {
  const filter = {};
  const options = {
    sortBy: req.query.sortBy,
    limit: req.query.limit,
    page: req.query.page,
  };

  if (req.query.user_id) filter.user_id = parseInt(req.query.user_id);
  if (req.query.role_id) filter.role_id = parseInt(req.query.role_id);

  const result = await userRoleService.queryUserRoleAssignments(filter, options);
  res.send(result);
});

const getRolesByUser = catchAsync(async (req, res) => {
  const roles = await userRoleService.getRolesByUser(parseInt(req.params.userId));
  res.send(roles);
});

const getUsersByRole = catchAsync(async (req, res) => {
  const users = await userRoleService.getUsersByRole(parseInt(req.params.roleId));
  res.send(users);
});

const removeRoleFromUser = catchAsync(async (req, res) => {
  const { user_id, role_id } = req.body;
  await userRoleService.removeRoleFromUser(user_id, role_id);
  res.status(httpStatus.NO_CONTENT).send();
});

const removeAllRolesFromUser = catchAsync(async (req, res) => {
  const result = await userRoleService.removeAllRolesFromUser(parseInt(req.params.userId));
  res.send({ deleted_count: result.count });
});

const removeAllUsersFromRole = catchAsync(async (req, res) => {
  const result = await userRoleService.removeAllUsersFromRole(parseInt(req.params.roleId));
  res.send({ deleted_count: result.count });
});

const updateUserRoles = catchAsync(async (req, res) => {
  const { role_ids } = req.body;
  const userId = parseInt(req.params.userId);
  const result = await userRoleService.updateUserRoles(userId, role_ids);
  res.send(result);
});

module.exports = {
  assignRoleToUser,
  queryUserRoleAssignments,
  getRolesByUser,
  updateUserRoles,
  getUsersByRole,
  removeRoleFromUser,
  removeAllRolesFromUser,
  removeAllUsersFromRole,
};