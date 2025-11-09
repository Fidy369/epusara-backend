const Joi = require('joi');

const createMenu = {
  body: Joi.object().keys({
    parent_id: Joi.number().integer(),
    name: Joi.string().required(),
    label_ms: Joi.string().required(),
    label_en: Joi.string().required(),
    description: Joi.string(),
    icon_name: Joi.string(),
    icon_color: Joi.string(),
    url: Joi.string().required(),
    order: Joi.number().integer().default(0),
    status: Joi.number().integer().valid(0, 1).default(1),
  }),
};

const queryMenus = {
  query: Joi.object().keys({
    parent_id: Joi.number().integer(),
    status: Joi.number().integer().valid(0, 1),
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getMenu = {
  params: Joi.object().keys({
    menuId: Joi.number().integer().required(),
  }),
};

const updateMenu = {
  params: Joi.object().keys({
    menuId: Joi.number().integer().required(),
  }),
  body: Joi.object().keys({
    parent_id: Joi.number().integer(),
    name: Joi.string(),
    label_ms: Joi.string(),
    label_en: Joi.string(),
    description: Joi.string(),
    icon_name: Joi.string(),
    icon_color: Joi.string(),
    url: Joi.string(),
    order: Joi.number().integer(),
    status: Joi.number().integer().valid(0, 1),
  }),
};

const deleteMenu = {
  params: Joi.object().keys({
    menuId: Joi.number().integer().required(),
  }),
};

const assignMenuToRole = {
  body: Joi.object().keys({
    roleId: Joi.number().integer().required(),
    menuId: Joi.number().integer().required(),
  }),
};

const removeMenuFromRole = {
  body: Joi.object().keys({
    roleId: Joi.number().integer().required(),
    menuId: Joi.number().integer().required(),
  }),
};

const getUserMenu = {
  query: Joi.object().keys({}),
};

const putMenu = {
  params: Joi.object().keys({
    menuId: Joi.number().integer().required(),
  }),
  body: Joi.object().keys({
    parent_id: Joi.number().integer(),
    name: Joi.string().required(),
    label_ms: Joi.string().required(),
    label_en: Joi.string().required(),
    description: Joi.string(),
    icon_name: Joi.string(),
    icon_color: Joi.string(),
    url: Joi.string().required(),
    order: Joi.number().integer().default(0),
    status: Joi.number().integer().valid(0, 1).default(1),
  }),
};

module.exports = {
  createMenu,
  queryMenus,
  getMenu,
  updateMenu,
  putMenu,
  deleteMenu,
  assignMenuToRole,
  removeMenuFromRole,
  getUserMenu,
};