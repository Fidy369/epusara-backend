const Joi = require('joi');

const createRefJenisPermohonan = {
  body: Joi.object().keys({
    kod_jenis_permohonan: Joi.string().length(2).required(),
    label_ms: Joi.string().max(50).allow(null),
    label_en: Joi.string().max(50).allow(null),
    tempoh_sah_permohonan: Joi.number().integer().default(0),
    is_active: Joi.boolean().allow(null),
    created_by: Joi.number().integer().allow(null),
    updated_by: Joi.number().integer().allow(null),
  }),
};

const getRefJenisPermohonans = {
  query: Joi.object().keys({
    is_active: Joi.boolean(),
    label_ms: Joi.string(),
    label_en: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getRefJenisPermohonan = {
  params: Joi.object().keys({
    kod: Joi.string().length(2).required(),
  }),
};

const updateRefJenisPermohonan = {
  params: Joi.object().keys({
    kod: Joi.string().length(2).required(),
  }),
  body: Joi.object()
    .keys({
      label_ms: Joi.string().max(50).allow(null),
      label_en: Joi.string().max(50).allow(null),
      tempoh_sah_permohonan: Joi.number().integer(),
      is_active: Joi.boolean().allow(null),
      updated_by: Joi.number().integer().allow(null),
    })
    .min(1),
};

// ADD THIS NEW VALIDATION FOR PUT
const replaceRefJenisPermohonan = {
  params: Joi.object().keys({
    kod: Joi.string().length(2).required(),
  }),
  body: Joi.object().keys({
    kod_jenis_permohonan: Joi.string().length(2).required(),
    label_ms: Joi.string().max(50).allow(null),
    label_en: Joi.string().max(50).allow(null),
    tempoh_sah_permohonan: Joi.number().integer().default(0),
    is_active: Joi.boolean().allow(null),
    updated_by: Joi.number().integer().allow(null),
  }),
};

const deleteRefJenisPermohonan = {
  params: Joi.object().keys({
    kod: Joi.string().length(2).required(),
  }),
};

module.exports = {
  createRefJenisPermohonan,
  getRefJenisPermohonans,
  getRefJenisPermohonan,
  updateRefJenisPermohonan,
  replaceRefJenisPermohonan, // ADD THIS
  deleteRefJenisPermohonan,
};