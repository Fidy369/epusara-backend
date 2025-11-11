const Joi = require('joi');

const createRefNegara = {
  body: Joi.object().keys({
    kod_negara: Joi.string().length(2).required(),
    label_ms: Joi.string().max(150).required(),
    label_en: Joi.string().max(150).required(),
    is_active: Joi.boolean().default(false),
    created_by: Joi.number().integer().default(0),
    updated_by: Joi.number().integer().default(0),
  }),
};

const getRefNegaras = {
  query: Joi.object().keys({
    kod_negara: Joi.string().length(2),
    label_ms: Joi.string(),
    label_en: Joi.string(),
    is_active: Joi.boolean(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getRefNegara = {
  params: Joi.object().keys({
    kod: Joi.string().length(2).required(),
  }),
};

const updateRefNegara = {
  params: Joi.object().keys({
    kod: Joi.string().length(2).required(),
  }),
  body: Joi.object()
    .keys({
      label_ms: Joi.string().max(150),
      label_en: Joi.string().max(150),
      is_active: Joi.boolean(),
      updated_by: Joi.number().integer(),
    })
    .min(1),
};

const deleteRefNegara = {
  params: Joi.object().keys({
    kod: Joi.string().length(2).required(),
  }),
};

module.exports = {
  createRefNegara,
  getRefNegaras,
  getRefNegara,
  updateRefNegara,
  deleteRefNegara,
};