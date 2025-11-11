const Joi = require('joi');

const createPermohonanDetail = {
  body: Joi.object().keys({
    permohonan_id: Joi.number().integer().required(),
    tapak_perkuburan_id: Joi.number().integer(),
    status_permohonan: Joi.string().valid('DL', 'DT', 'DB', 'DP', 'DF').default('DP'),
    status_pengebumian: Joi.string().valid('SS', 'BS').default('BS'),
    masa_dipilih_pemohon: Joi.date().required(),
    masa_ditetapkan_pegawai: Joi.date(),
    masa_selesai_pengebumian: Joi.date(),
    is_in_kawasan_mbjb: Joi.boolean().default(false),
    lot_id: Joi.number().integer().default(0),
  }),
};

const queryPermohonanDetails = {
  query: Joi.object().keys({
    permohonan_id: Joi.number().integer(),
    tapak_perkuburan_id: Joi.number().integer(),
    status_permohonan: Joi.string().valid('DL', 'DT', 'DB', 'DP', 'DF'),
    status_pengebumian: Joi.string().valid('SS', 'BS'),
    is_in_kawasan_mbjb: Joi.string().valid('true', 'false'),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getPermohonanDetail = {
  params: Joi.object().keys({
    detailId: Joi.number().integer().required(),
  }),
};

const getPermohonanDetailByPermohonanId = {
  params: Joi.object().keys({
    permohonanId: Joi.number().integer().required(),
  }),
};

const updatePermohonanDetail = {
  params: Joi.object().keys({
    detailId: Joi.number().integer().required(),
  }),
  body: Joi.object().keys({
    tapak_perkuburan_id: Joi.number().integer(),
    status_permohonan: Joi.string().valid('DL', 'DT', 'DB', 'DP', 'DF'),
    status_pengebumian: Joi.string().valid('SS', 'BS'),
    masa_dipilih_pemohon: Joi.date(),
    masa_ditetapkan_pegawai: Joi.date(),
    masa_selesai_pengebumian: Joi.date(),
    is_in_kawasan_mbjb: Joi.boolean(),
    lot_id: Joi.number().integer(),
  }),
};

const deletePermohonanDetail = {
  params: Joi.object().keys({
    detailId: Joi.number().integer().required(),
  }),
};

module.exports = {
  createPermohonanDetail,
  queryPermohonanDetails,
  getPermohonanDetail,
  getPermohonanDetailByPermohonanId,
  updatePermohonanDetail,
  deletePermohonanDetail,
};