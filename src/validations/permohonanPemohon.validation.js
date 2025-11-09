const Joi = require('joi');

const createPermohonanPemohon = {
  body: Joi.object().keys({
    permohonan_id: Joi.number().integer().required(),
    nama_pemohon: Joi.string().max(50).required(),
    jenis_pengenalan: Joi.string().max(20).required(),
    no_pengenalan: Joi.string().max(12).required(),
    ref_hubungan_id: Joi.number().integer().required(),
    hubungan_lain: Joi.string().max(50).allow(null),
    is_waris: Joi.boolean().required(),
    phone: Joi.string().max(13).required(),
    email: Joi.string().email().max(50).required(),
    address1: Joi.string().max(500).required(),
    address2: Joi.string().max(500).allow(null),
    address3: Joi.string().max(500).allow(null),
    poskod: Joi.string().max(5).required(),
    created_by: Joi.number().integer().required(),
    updated_by: Joi.number().integer().required(),
  }),
};

const getPermohonanPemohon = {
  query: Joi.object().keys({
    permohonan_id: Joi.number().integer(),
    nama_pemohon: Joi.string(),
    no_pengenalan: Joi.string(),
    ref_hubungan_id: Joi.number().integer(),
    is_waris: Joi.boolean(),
    sortBy: Joi.string(),
    sortType: Joi.string().valid('asc', 'desc'),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getPermohonanPemohonById = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

const updatePermohonanPemohon = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
  body: Joi.object()
    .keys({
      permohonan_id: Joi.number().integer(),
      nama_pemohon: Joi.string(),
      jenis_pengenalan: Joi.string(),
      no_pengenalan: Joi.string(),
      ref_hubungan_id: Joi.number().integer(),
      hubungan_lain: Joi.string().allow(null),
      is_waris: Joi.boolean(),
      phone: Joi.string(),
      email: Joi.string().email(),
      address1: Joi.string(),
      address2: Joi.string().allow(null),
      address3: Joi.string().allow(null),
      poskod: Joi.string(),
      updated_by: Joi.number().integer(),
    })
    .min(1),
};

const deletePermohonanPemohon = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

const getByPermohonanId = {
  params: Joi.object().keys({
    permohonanId: Joi.number().integer().required(),
  }),
};

const getByHubungan = {
  params: Joi.object().keys({
    hubunganId: Joi.number().integer().required(),
  }),
};

const replacePermohonanPemohon = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
  body: Joi.object().keys({
    permohonan_id: Joi.number().integer().required(),
    nama_pemohon: Joi.string().max(50).required(),
    jenis_pengenalan: Joi.string().max(20).required(),
    no_pengenalan: Joi.string().max(12).required(),
    ref_hubungan_id: Joi.number().integer().required(),
    hubungan_lain: Joi.string().max(50).allow(null),
    is_waris: Joi.boolean().required(),
    phone: Joi.string().max(13).required(),
    email: Joi.string().email().max(50).required(),
    address1: Joi.string().max(500).required(),
    address2: Joi.string().max(500).allow(null),
    address3: Joi.string().max(500).allow(null),
    poskod: Joi.string().max(5).required(),
    updated_by: Joi.number().integer().required(),
  }),
};

module.exports = {
  createPermohonanPemohon,
  getPermohonanPemohon,
  getPermohonanPemohonById,
  replacePermohonanPemohon,
  updatePermohonanPemohon,
  deletePermohonanPemohon,
  getByPermohonanId,
  getByHubungan,
};