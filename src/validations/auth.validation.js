const Joi = require('joi');
const { password } = require('./custom.validation');

const register = {
  body: Joi.object().keys({
    // Accept both English and Malay field names
    ic: Joi.string(),
    no_pengenalan: Joi.string(),
    emel: Joi.string().email(),
    email: Joi.string().email(),
    password: Joi.string().required().custom(password),
    nama_penuh: Joi.string(),
    full_name: Joi.string(),
  }).or('ic', 'no_pengenalan')
    .or('emel', 'email')
    .or('nama_penuh', 'full_name'),
};

const login = {
  body: Joi.object().keys({
    no_pengenalan: Joi.string(),
    ic: Joi.string(),
    password: Joi.string().required(),
  }).or('no_pengenalan', 'ic'),
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
  }),
};

const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
};
