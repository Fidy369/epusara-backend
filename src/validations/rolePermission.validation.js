const Joi = require('joi');

const assignPermissionToRole = {
  body: Joi.object().keys({
    role_id: Joi.number().integer().required(),
    permission_id: Joi.number().integer().required(),
    created_by: Joi.number().integer().required(),
    updated_by: Joi.number().integer().required(),
  }),
};

const getRolePermissions = {
  query: Joi.object().keys({
    role_id: Joi.number().integer(),
    permission_id: Joi.number().integer(),
    sortBy: Joi.string(),
    sortType: Joi.string().valid('asc', 'desc'),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getPermissionsByRole = {
  params: Joi.object().keys({
    roleId: Joi.number().integer().required(),
  }),
};

const getRolesByPermission = {
  params: Joi.object().keys({
    permissionId: Joi.number().integer().required(),
  }),
};

const removePermissionFromRole = {
  params: Joi.object().keys({
    roleId: Joi.number().integer().required(),
    permissionId: Joi.number().integer().required(),
  }),
};

const bulkAssignPermissionsToRole = {
  body: Joi.object().keys({
    role_id: Joi.number().integer().required(),
    permission_ids: Joi.array().items(Joi.number().integer()).required(),
    created_by: Joi.number().integer().required(),
    updated_by: Joi.number().integer().required(),
  }),
};

const removeAllPermissionsFromRole = {
  params: Joi.object().keys({
    roleId: Joi.number().integer().required(),
  }),
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