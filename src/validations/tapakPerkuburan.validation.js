const Joi = require('joi');

const createTapakPerkuburan = {
  body: Joi.object().keys({
    nama_tapak: Joi.string().max(100).required(),
    lokasi_tapak: Joi.string().max(255).default(''),
    keluasan_tapak: Joi.number().precision(6),
    kapasiti_lot_keseluruhan: Joi.number().integer(),
    description: Joi.string().max(255),
    created_by: Joi.number().integer().default(0),
    updated_by: Joi.number().integer().default(0),
  }),
};

const getTapakPerkuburans = {
  query: Joi.object().keys({
    nama_tapak: Joi.string(),
    lokasi_tapak: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getTapakPerkuburan = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

const updateTapakPerkuburan = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
  body: Joi.object()
    .keys({
      nama_tapak: Joi.string().max(100),
      lokasi_tapak: Joi.string().max(255),
      keluasan_tapak: Joi.number().precision(6),
      kapasiti_lot_keseluruhan: Joi.number().integer(),
      description: Joi.string().max(255),
      updated_by: Joi.number().integer(),
    })
    .min(1),
};

const deleteTapakPerkuburan = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

module.exports = {
  createTapakPerkuburan,
  getTapakPerkuburans,
  getTapakPerkuburan,
  updateTapakPerkuburan,
  deleteTapakPerkuburan,
};