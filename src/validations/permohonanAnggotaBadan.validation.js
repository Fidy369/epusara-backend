const Joi = require('joi');

const createPermohonanAnggotaBadan = {
  body: Joi.object().keys({
    permohonan_id: Joi.number().integer().required(),
    ref_bahagian_badan_kod: Joi.string().length(4).required(),
    bahagian_badan_others: Joi.string().allow(null, ''),
    created_by: Joi.number().integer().default(0),
    updated_by: Joi.number().integer().default(0),
  }),
};

const getPermohonanAnggotaBadan = {
  query: Joi.object().keys({
    permohonan_id: Joi.number().integer(),
    ref_bahagian_badan_kod: Joi.string().length(4),
    sortBy: Joi.string(),
    sortType: Joi.string().valid('asc', 'desc'),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getPermohonanAnggotaBadanById = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

const updatePermohonanAnggotaBadan = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
  body: Joi.object()
    .keys({
      permohonan_id: Joi.number().integer(),
      ref_bahagian_badan_kod: Joi.string().length(4),
      bahagian_badan_others: Joi.string().allow(null, ''),
      updated_by: Joi.number().integer(),
    })
    .min(1),
};

const deletePermohonanAnggotaBadan = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

const getByPermohonanId = {
  params: Joi.object().keys({
    permohonanId: Joi.number().integer().required(),
  }),
};

const deleteByPermohonanId = {
  params: Joi.object().keys({
    permohonanId: Joi.number().integer().required(),
  }),
};

module.exports = {
  createPermohonanAnggotaBadan,
  getPermohonanAnggotaBadan,
  getPermohonanAnggotaBadanById,
  updatePermohonanAnggotaBadan,
  deletePermohonanAnggotaBadan,
  getByPermohonanId,
  deleteByPermohonanId,
};