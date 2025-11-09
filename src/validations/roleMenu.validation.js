const Joi = require('joi');

const assignMenuToRole = {
  body: Joi.object().keys({
    role_id: Joi.number().integer().required(),
    menu_id: Joi.number().integer().required(),
    created_by: Joi.number().integer().required(),
    updated_by: Joi.number().integer().required(),
  }),
};

const getRoleMenus = {
  query: Joi.object().keys({
    role_id: Joi.number().integer(),
    menu_id: Joi.number().integer(),
    sortBy: Joi.string(),
    sortType: Joi.string().valid('asc', 'desc'),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getMenusByRole = {
  params: Joi.object().keys({
    roleId: Joi.number().integer().required(),
  }),
};

const getRolesByMenu = {
  params: Joi.object().keys({
    menuId: Joi.number().integer().required(),
  }),
};

const removeMenuFromRole = {
  params: Joi.object().keys({
    roleId: Joi.number().integer().required(),
    menuId: Joi.number().integer().required(),
  }),
};

const bulkAssignMenusToRole = {
  body: Joi.object().keys({
    role_id: Joi.number().integer().required(),
    menu_ids: Joi.array().items(Joi.number().integer()).required(),
    created_by: Joi.number().integer().required(),
    updated_by: Joi.number().integer().required(),
  }),
};

const removeAllMenusFromRole = {
  params: Joi.object().keys({
    roleId: Joi.number().integer().required(),
  }),
};

const replaceRoleMenus = {
  params: Joi.object().keys({
    roleId: Joi.number().integer().required(),
  }),
  body: Joi.object().keys({
    menu_ids: Joi.array().items(Joi.number().integer()).required(),
    updated_by: Joi.number().integer().required(),
  }),
};

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