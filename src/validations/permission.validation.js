const Joi = require('joi');

const createPermission = {
  body: Joi.object().keys({
    name: Joi.string().max(150).required(),
    description: Joi.string().max(255).optional(),
    created_by: Joi.number().integer().default(0),
    updated_by: Joi.number().integer().default(0),
  }),
};

const getPermissions = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getPermission = {
  params: Joi.object().keys({
    permissionId: Joi.number().integer().required(),
  }),
};

const updatePermission = {
  params: Joi.object().keys({
    permissionId: Joi.number().integer().required(),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().max(150),
      description: Joi.string().max(255),
      updated_by: Joi.number().integer(),
    })
    .min(1),
};

const deletePermission = {
  params: Joi.object().keys({
    permissionId: Joi.number().integer().required(),
  }),
};

const assignPermissionToRole = {
  params: Joi.object().keys({
    roleId: Joi.number().integer().required(),
    permissionId: Joi.number().integer().required(),
  }),
};

const removePermissionFromRole = {
  params: Joi.object().keys({
    roleId: Joi.number().integer().required(),
    permissionId: Joi.number().integer().required(),
  }),
};

const putPermission = {
  params: Joi.object().keys({
    permissionId: Joi.number().integer().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().max(150).required(),
    description: Joi.string().max(255).required(),
    updated_by: Joi.number().integer().default(0),
  }),
};

module.exports = {
  createPermission,
  getPermissions,
  getPermission,
  updatePermission,
  putPermission,
  deletePermission,
  assignPermissionToRole,
  removePermissionFromRole,
};