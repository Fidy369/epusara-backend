const Joi = require('joi');

const createPasswordHistory = {
  body: Joi.object().keys({
    user_id: Joi.number().integer().required(),
    selector: Joi.string().length(12).required(),
    hashed_token: Joi.string().length(64).required(),
    expires_at: Joi.date().required(),
  }),
};

const queryPasswordHistory = {
  query: Joi.object().keys({
    user_id: Joi.number().integer(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getPasswordHistory = {
  params: Joi.object().keys({
    historyId: Joi.number().integer().required(),
  }),
};

const getPasswordHistoryByUser = {
  params: Joi.object().keys({
    userId: Joi.number().integer().required(),
  }),
  query: Joi.object().keys({
    limit: Joi.number().integer().min(1).max(50).default(10),
  }),
};

const deletePasswordHistory = {
  params: Joi.object().keys({
    historyId: Joi.number().integer().required(),
  }),
};

const updatePasswordHistory = {
  params: Joi.object().keys({
    historyId: Joi.number().integer().required(),
  }),
  body: Joi.object()
    .keys({
      selector: Joi.string().length(12),
      hashed_token: Joi.string().length(64),
      expires_at: Joi.date(),
    })
    .min(1), // At least one field must be provided
};

module.exports = {
  createPasswordHistory,
  queryPasswordHistory,
  getPasswordHistory,
  updatePasswordHistory,
  getPasswordHistoryByUser,
  deletePasswordHistory,
};