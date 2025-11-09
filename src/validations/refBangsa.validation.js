const Joi = require('joi');

const createRefBangsa = {
  body: Joi.object().keys({
    kod_bangsa: Joi.string().length(4).required(),
    label_ms: Joi.string().max(50).required(),
    label_en: Joi.string().max(50).required(),
    is_active: Joi.boolean().default(false),
    created_by: Joi.number().integer().default(0),
    updated_by: Joi.number().integer().default(0),
  }),
};

const getRefBangsas = {
  query: Joi.object().keys({
    is_active: Joi.boolean(),
    label_ms: Joi.string(),
    label_en: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getRefBangsa = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

const updateRefBangsa = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
  body: Joi.object()
    .keys({
      kod_bangsa: Joi.string().length(4),
      label_ms: Joi.string().max(50),
      label_en: Joi.string().max(50),
      is_active: Joi.boolean(),
      updated_by: Joi.number().integer(),
    })
    .min(1),
};

const deleteRefBangsa = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

const replaceRefBangsa = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
  body: Joi.object().keys({
    kod_bangsa: Joi.string().length(4).required(),
    label_ms: Joi.string().max(50).required(),
    label_en: Joi.string().max(50).required(),
    is_active: Joi.boolean().default(false),
    updated_by: Joi.number().integer().default(0),
  }),
};

module.exports = {
  createRefBangsa,
  getRefBangsas,
  getRefBangsa,
  replaceRefBangsa,
  updateRefBangsa,
  deleteRefBangsa,
};