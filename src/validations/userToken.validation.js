const Joi = require('joi');

const createUserToken = {
  body: Joi.object().keys({
    user_id: Joi.number().integer().required(),
    selector: Joi.string().length(12).required(),
    hashed_validator: Joi.string().length(64).required(),
    expires: Joi.date().required(),
  }),
};

const queryUserTokens = {
  query: Joi.object().keys({
    user_id: Joi.number().integer(),
    selector: Joi.string().length(12),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUserToken = {
  params: Joi.object().keys({
    tokenId: Joi.number().integer().required(),
  }),
};

const getUserTokenBySelector = {
  params: Joi.object().keys({
    selector: Joi.string().length(12).required(),
  }),
};

const getUserTokensByUser = {
  params: Joi.object().keys({
    userId: Joi.number().integer().required(),
  }),
};

const updateUserToken = {
  params: Joi.object().keys({
    tokenId: Joi.number().integer().required(),
  }),
  body: Joi.object().keys({
    selector: Joi.string().length(12),
    hashed_validator: Joi.string().length(64),
    expires: Joi.date(),
  }),
};

const deleteUserToken = {
  params: Joi.object().keys({
    tokenId: Joi.number().integer().required(),
  }),
};

const deleteUserTokensByUser = {
  params: Joi.object().keys({
    userId: Joi.number().integer().required(),
  }),
};

module.exports = {
  createUserToken,
  queryUserTokens,
  getUserToken,
  getUserTokenBySelector,
  getUserTokensByUser,
  updateUserToken,
  deleteUserToken,
  deleteUserTokensByUser,
};