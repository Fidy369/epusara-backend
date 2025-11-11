const Joi = require('joi');

const createRefJenisHaiwan = {
  body: Joi.object().keys({
    id: Joi.number().integer().required(),
    kod_jenis_haiwan: Joi.string().length(4).required(),
    label_ms: Joi.string().max(50).required(),
    label_en: Joi.string().max(50).required(),
    is_active: Joi.number().integer().valid(0, 1).required(),
    created_by: Joi.number().integer().default(0),
    updated_by: Joi.number().integer().default(0),
  }),
};

const getRefJenisHaiwans = {
  query: Joi.object().keys({
    is_active: Joi.number().integer().valid(0, 1),
    kod_jenis_haiwan: Joi.string().length(4),
    label_ms: Joi.string(),
    label_en: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getRefJenisHaiwan = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

const getRefJenisHaiwanByKod = {
  params: Joi.object().keys({
    kod: Joi.string().length(4).required(),
  }),
};

const updateRefJenisHaiwan = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
  body: Joi.object()
    .keys({
      kod_jenis_haiwan: Joi.string().length(4),
      label_ms: Joi.string().max(50),
      label_en: Joi.string().max(50),
      is_active: Joi.number().integer().valid(0, 1),
      updated_by: Joi.number().integer(),
    })
    .min(1),
};

const deleteRefJenisHaiwan = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

module.exports = {
  createRefJenisHaiwan,
  getRefJenisHaiwans,
  getRefJenisHaiwan,
  updateRefJenisHaiwan,
  deleteRefJenisHaiwan,
};