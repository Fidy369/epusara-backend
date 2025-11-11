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

module.exports = {
  assignRoleToUser,
  queryUserRoleAssignments,
  getRolesByUser,
  getUsersByRole,
  removeRoleFromUser,
  removeAllRolesFromUser,
  removeAllUsersFromRole,
};