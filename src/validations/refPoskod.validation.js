const Joi = require('joi');

const createPostalCode = {
  body: Joi.object().keys({
    poskod: Joi.string().length(5),
    bandar: Joi.string().max(50).required(),
    daerah: Joi.string().max(50).required(),
    kod_negeri: Joi.string().length(2).required(),
    is_active: Joi.boolean(),
    created_by: Joi.number().integer(),
    updated_by: Joi.number().integer(),
  }),
};

const getPostalCodes = {
  query: Joi.object().keys({
    poskod: Joi.string().length(6),
    bandar: Joi.string(),
    daerah: Joi.string(),
    kod_negeri: Joi.string().length(2),
    is_active: Joi.boolean(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getPostalCode = {
  params: Joi.object().keys({
    postalCodeId: Joi.number().integer().required(),
  }),
};

const getPostalCodeByCode = {
  params: Joi.object().keys({
    code: Joi.string().length(6).required(),
  }),
};

const getPostalCodesByState = {
  params: Joi.object().keys({
    stateCode: Joi.string().length(2).required(),
  }),
};

const updatePostalCode = {
  params: Joi.object().keys({
    postalCodeId: Joi.number().integer().required(),
  }),
  body: Joi.object()
    .keys({
      poskod: Joi.string().length(6),
      bandar: Joi.string().max(50),
      daerah: Joi.string().max(50),
      kod_negeri: Joi.string().length(2),
      is_active: Joi.boolean(),
      updated_by: Joi.number().integer(),
    })
    .min(1),
};

const deletePostalCode = {
  params: Joi.object().keys({
    postalCodeId: Joi.number().integer().required(),
  }),
};

const replacePostalCode = {
  params: Joi.object().keys({
    postalCodeId: Joi.number().integer().required(),
  }),
  body: Joi.object().keys({
    poskod: Joi.string().length(6),
    bandar: Joi.string().max(50).required(),
    daerah: Joi.string().max(50).required(),
    kod_negeri: Joi.string().length(2).required(),
    is_active: Joi.boolean(),
    updated_by: Joi.number().integer(),
  }),
};

module.exports = {
  createPostalCode,
  getPostalCodes,
  replacePostalCode,
  getPostalCode,
  getPostalCodeByCode,
  getPostalCodesByState,
  updatePostalCode,
  deletePostalCode,
};