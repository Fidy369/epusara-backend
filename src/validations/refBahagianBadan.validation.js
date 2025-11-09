const Joi = require('joi');

const createRefBahagianBadan = {
  body: Joi.object().keys({
    kod_bahagian_badan: Joi.string().length(4).required(),
    label_ms: Joi.string().max(50).required(),
    label_en: Joi.string().max(50).allow(null),
    is_active: Joi.boolean().allow(null),
    created_by: Joi.number().integer().allow(null),
    updated_by: Joi.number().integer().allow(null),
  }),
};

const getRefBahagianBadans = {
  query: Joi.object().keys({
    is_active: Joi.boolean(),
    label_ms: Joi.string(),
    label_en: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getRefBahagianBadan = {
  params: Joi.object().keys({
    id: Joi.string().length(4).required(),
  }),
};

const updateRefBahagianBadan = {
  params: Joi.object().keys({
    id: Joi.string().length(4).required(),
  }),
  body: Joi.object()
    .keys({
      kod_bahagian_badan: Joi.string().length(4),
      label_ms: Joi.string().max(50),
      label_en: Joi.string().max(50).allow(null),
      is_active: Joi.boolean().allow(null),
      updated_by: Joi.number().integer().allow(null),
    })
    .min(1),
};

// ADD THIS NEW VALIDATION FOR PUT
const replaceRefBahagianBadan = {
  params: Joi.object().keys({
    id: Joi.string().length(4).required(),
  }),
  body: Joi.object().keys({
    kod_bahagian_badan: Joi.string().length(4).required(),
    label_ms: Joi.string().max(50).required(),
    label_en: Joi.string().max(50).allow(null),
    is_active: Joi.boolean().allow(null),
    updated_by: Joi.number().integer().allow(null),
  }),
};

const deleteRefBahagianBadan = {
  params: Joi.object().keys({
    id: Joi.string().length(4).required(),
  }),
};

module.exports = {
  createRefBahagianBadan,
  getRefBahagianBadans,
  getRefBahagianBadan,
  updateRefBahagianBadan,
  replaceRefBahagianBadan, // ADD THIS
  deleteRefBahagianBadan,
};