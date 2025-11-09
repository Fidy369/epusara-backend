const Joi = require('joi');

const createRefHubungan = {
  body: Joi.object().keys({
    label_ms: Joi.string().max(50).required(),
    label_en: Joi.string().max(50).required(),
    is_active: Joi.boolean().default(false),
    created_by: Joi.number().integer().default(0),
    updated_by: Joi.number().integer().default(0),
  }),
};

const getRefHubungans = {
  query: Joi.object().keys({
    is_active: Joi.boolean(),
    label_ms: Joi.string(),
    label_en: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getRefHubungan = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

const updateRefHubungan = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
  body: Joi.object()
    .keys({
      label_ms: Joi.string().max(50),
      label_en: Joi.string().max(50),
      is_active: Joi.boolean(),
      updated_by: Joi.number().integer(),
    })
    .min(1),
};

const deleteRefHubungan = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

const replaceRefHubungan = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
  body: Joi.object().keys({
    label_ms: Joi.string().max(50).required(),
    label_en: Joi.string().max(50).required(),
    is_active: Joi.boolean().required(),
    updated_by: Joi.number().integer().default(0),
  }),
};

module.exports = {
  createRefHubungan,
  getRefHubungans,
  getRefHubungan,
  replaceRefHubungan,
  updateRefHubungan,
  deleteRefHubungan,
};