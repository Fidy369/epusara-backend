const Joi = require('joi');

const createZonTapakPerkuburan = {
  body: Joi.object().keys({
    tapak_perkuburan_id: Joi.number().integer().required(),
    nama_zon: Joi.string().max(255).default(''),
    ref_kategori_jenazah_id: Joi.number().integer().default(0),
    keluasan_zon: Joi.number().precision(6).default(0),
    kapasiti_lot_keseluruhan: Joi.number().integer().default(0),
    created_by: Joi.number().integer().default(0),
    updated_by: Joi.number().integer().default(0),
  }),
};

const getZonTapakPerkuburans = {
  query: Joi.object().keys({
    tapak_perkuburan_id: Joi.number().integer(),
    nama_zon: Joi.string(),
    ref_kategori_jenazah_id: Joi.number().integer(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getZonTapakPerkuburan = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

const updateZonTapakPerkuburan = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
  body: Joi.object()
    .keys({
      tapak_perkuburan_id: Joi.number().integer(),
      nama_zon: Joi.string().max(255),
      ref_kategori_jenazah_id: Joi.number().integer(),
      keluasan_zon: Joi.number().precision(6),
      kapasiti_lot_keseluruhan: Joi.number().integer(),
      updated_by: Joi.number().integer(),
    })
    .min(1),
};

const deleteZonTapakPerkuburan = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

const replaceZonTapakPerkuburan = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
  body: Joi.object().keys({
    tapak_perkuburan_id: Joi.number().integer().required(),
    nama_zon: Joi.string().max(255).default(''),
    ref_kategori_jenazah_id: Joi.number().integer().default(0),
    keluasan_zon: Joi.number().precision(6).default(0),
    kapasiti_lot_keseluruhan: Joi.number().integer().default(0),
    updated_by: Joi.number().integer().default(0),
  }),
};

module.exports = {
  createZonTapakPerkuburan,
  getZonTapakPerkuburans,
  getZonTapakPerkuburan,
  replaceZonTapakPerkuburan,
  updateZonTapakPerkuburan,
  deleteZonTapakPerkuburan,
};