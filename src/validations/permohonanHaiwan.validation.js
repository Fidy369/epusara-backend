const Joi = require('joi');

const createPermohonanHaiwan = {
  body: Joi.object().keys({
    permohonan_id: Joi.number().integer().required(),
    ref_jenis_haiwan_kod: Joi.string().length(4).required(),
    created_by: Joi.number().integer().default(0),
    updated_by: Joi.number().integer().default(0),
  }),
};

const getPermohonanHaiwan = {
  query: Joi.object().keys({
    permohonan_id: Joi.number().integer(),
    ref_jenis_haiwan_kod: Joi.string().length(4),
    sortBy: Joi.string(),
    sortType: Joi.string().valid('asc', 'desc'),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getPermohonanHaiwanById = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

const updatePermohonanHaiwan = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
  body: Joi.object()
    .keys({
      permohonan_id: Joi.number().integer(),
      ref_jenis_haiwan_kod: Joi.string().length(4),
      updated_by: Joi.number().integer(),
    })
    .min(1),
};

const deletePermohonanHaiwan = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

const getByPermohonanId = {
  params: Joi.object().keys({
    permohonanId: Joi.number().integer().required(),
  }),
};

const getByJenisHaiwan = {
  params: Joi.object().keys({
    jenisHaiwan: Joi.string().length(4).required(),
  }),
};

module.exports = {
  createPermohonanHaiwan,
  getPermohonanHaiwan,
  getPermohonanHaiwanById,
  updatePermohonanHaiwan,
  deletePermohonanHaiwan,
  getByPermohonanId,
  getByJenisHaiwan,
};