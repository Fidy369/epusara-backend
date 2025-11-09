const Joi = require('joi');

const createPermohonanJenazah = {
  body: Joi.object().keys({
    permohonan_id: Joi.number().integer().required(),
    nama_jenazah: Joi.string().max(50).required(),
    kod_warganegara: Joi.string().length(2).required(),
    jenis_pengenalan: Joi.string().max(8).required(),
    no_pengenalan: Joi.string().max(20).required(),
    ref_bangsa_id: Joi.number().integer().required(),
    kod_jantina: Joi.string().max(50).required(),
    ref_kategori_jenazah_id: Joi.number().integer().required(),
    tarikh_lahir: Joi.date().required(),
    masa_sah_kematian: Joi.date().allow(null),
    address1: Joi.string().max(500).required(),
    address2: Joi.string().max(500).required(),
    address3: Joi.string().max(500).required(),
    poskod: Joi.string().length(6).allow(null),
    created_by: Joi.number().integer().required(),
    updated_by: Joi.number().integer().required(),
  }),
};

const getPermohonanJenazah = {
  query: Joi.object().keys({
    permohonan_id: Joi.number().integer(),
    nama_jenazah: Joi.string(),
    no_pengenalan: Joi.string(),
    ref_kategori_jenazah_id: Joi.number().integer(),
    kod_warganegara: Joi.string().length(2),
    sortBy: Joi.string(),
    sortType: Joi.string().valid('asc', 'desc'),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getPermohonanJenazahById = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

const updatePermohonanJenazah = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
  body: Joi.object()
    .keys({
      permohonan_id: Joi.number().integer(),
      nama_jenazah: Joi.string(),
      kod_warganegara: Joi.string().length(2),
      jenis_pengenalan: Joi.string(),
      no_pengenalan: Joi.string(),
      ref_bangsa_id: Joi.number().integer(),
      kod_jantina: Joi.string(),
      ref_kategori_jenazah_id: Joi.number().integer(),
      tarikh_lahir: Joi.date(),
      masa_sah_kematian: Joi.date().allow(null),
      address1: Joi.string(),
      address2: Joi.string(),
      address3: Joi.string(),
      poskod: Joi.string().length(6).allow(null),
      updated_by: Joi.number().integer(),
    })
    .min(1),
};

const deletePermohonanJenazah = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

const getByPermohonanId = {
  params: Joi.object().keys({
    permohonanId: Joi.number().integer().required(),
  }),
};

const getByKategoriJenazah = {
  params: Joi.object().keys({
    kategoriId: Joi.number().integer().required(),
  }),
};

const replacePermohonanJenazah = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
  body: Joi.object().keys({
    permohonan_id: Joi.number().integer().required(),
    nama_jenazah: Joi.string().max(50).required(),
    kod_warganegara: Joi.string().length(2).required(),
    jenis_pengenalan: Joi.string().max(8).required(),
    no_pengenalan: Joi.string().max(20).required(),
    ref_bangsa_id: Joi.number().integer().required(),
    kod_jantina: Joi.string().max(50).required(),
    ref_kategori_jenazah_id: Joi.number().integer().required(),
    tarikh_lahir: Joi.date().required(),
    masa_sah_kematian: Joi.date().allow(null),
    address1: Joi.string().max(500).required(),
    address2: Joi.string().max(500).required(),
    address3: Joi.string().max(500).required(),
    poskod: Joi.string().length(6).allow(null),
    updated_by: Joi.number().integer().required(),
  }),
};

module.exports = {
  createPermohonanJenazah,
  getPermohonanJenazah,
  getPermohonanJenazahById,
  replacePermohonanJenazah,
  updatePermohonanJenazah,
  deletePermohonanJenazah,
  getByPermohonanId,
  getByKategoriJenazah,
};