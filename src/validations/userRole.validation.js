const Joi = require('joi');

const assignRoleToUser = {
  body: Joi.object().keys({
    user_id: Joi.number().integer().required(),
    role_id: Joi.number().integer().required(),
  }),
};

const queryUserRoleAssignments = {
  query: Joi.object().keys({
    user_id: Joi.number().integer(),
    role_id: Joi.number().integer(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getRolesByUser = {
  params: Joi.object().keys({
    userId: Joi.number().integer().required(),
  }),
};

const getUsersByRole = {
  params: Joi.object().keys({
    roleId: Joi.number().integer().required(),
  }),
};

const removeRoleFromUser = {
  body: Joi.object().keys({
    user_id: Joi.number().integer().required(),
    role_id: Joi.number().integer().required(),
  }),
};

const removeAllRolesFromUser = {
  params: Joi.object().keys({
    userId: Joi.number().integer().required(),
  }),
};

const removeAllUsersFromRole = {
  params: Joi.object().keys({
    roleId: Joi.number().integer().required(),
  }),
};

const updateUserRoles = {
  params: Joi.object().keys({
    userId: Joi.number().integer().required(),
  }),
  body: Joi.object().keys({
    role_ids: Joi.array().items(Joi.number().integer()).min(1).required(),
  }),
};

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