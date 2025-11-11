const Joi = require('joi');

const createPasswordReset = {
  body: Joi.object().keys({
    user_id: Joi.number().integer().required(),
    password: Joi.string().required(),
    created_by: Joi.number().integer().default(0),
  }),
};

const queryPasswordResets = {
  query: Joi.object().keys({
    user_id: Joi.number().integer(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getPasswordReset = {
  params: Joi.object().keys({
    resetId: Joi.number().integer().required(),
  }),
};

const getPasswordResetByUser = {
  params: Joi.object().keys({
    userId: Joi.number().integer().required(),
  }),
};

const deletePasswordReset = {
  params: Joi.object().keys({
    resetId: Joi.number().integer().required(),
  }),
};

const deletePasswordResetsByUser = {
  params: Joi.object().keys({
    userId: Joi.number().integer().required(),
  }),
};

module.exports = {
  createPasswordReset,
  queryPasswordResets,
  getPasswordReset,
  getPasswordResetByUser,
  deletePasswordReset,
  deletePasswordResetsByUser,
};