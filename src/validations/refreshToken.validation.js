const Joi = require('joi');

const createRefreshToken = {
  body: Joi.object().keys({
    user_id: Joi.number().integer().required(),
    token: Joi.string().required(),
    expires_at: Joi.date().required(),
    is_revoked: Joi.boolean().required(),
  }),
};

const queryRefreshTokens = {
  query: Joi.object().keys({
    user_id: Joi.number().integer(),
    is_revoked: Joi.string().valid('true', 'false'),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getRefreshToken = {
  params: Joi.object().keys({
    tokenId: Joi.number().integer().required(),
  }),
};

const getRefreshTokensByUser = {
  params: Joi.object().keys({
    userId: Joi.number().integer().required(),
  }),
};

const revokeRefreshToken = {
  params: Joi.object().keys({
    tokenId: Joi.number().integer().required(),
  }),
};

const deleteRefreshToken = {
  params: Joi.object().keys({
    tokenId: Joi.number().integer().required(),
  }),
};

const deleteRefreshTokensByUser = {
  params: Joi.object().keys({
    userId: Joi.number().integer().required(),
  }),
};

const replaceRefreshToken = {
  params: Joi.object().keys({
    tokenId: Joi.number().integer().required(),
  }),
  body: Joi.object().keys({
    user_id: Joi.number().integer().required(),
    token: Joi.string().required(),
    expires_at: Joi.date().required(),
    is_revoked: Joi.boolean().required(),
  }),
};

module.exports = {
  createRefreshToken,
  queryRefreshTokens,
  getRefreshToken,
  replaceRefreshToken,
  getRefreshTokensByUser,
  revokeRefreshToken,
  deleteRefreshToken,
  deleteRefreshTokensByUser,
};