const Joi = require('joi');

const createRefKategoriJenazah = {
  body: Joi.object().keys({
    kod_kategori_jenazah: Joi.string().length(4).required(),
    label_ms: Joi.string().max(50).required(),
    label_en: Joi.string().max(50).required(),
    harga: Joi.number().precision(2).min(0).default(0),
    flag_aktif: Joi.number().valid(0, 1).required(),
    created_by: Joi.number().integer().default(0),
    updated_by: Joi.number().integer().default(0),
  }),
};

const getRefKategoriJenazahs = {
  query: Joi.object().keys({
    kod_kategori_jenazah: Joi.string().length(4),
    label_ms: Joi.string(),
    label_en: Joi.string(),
    flag_aktif: Joi.number().valid(0, 1),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getRefKategoriJenazah = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

const getCategoryByCode = {
  params: Joi.object().keys({
    code: Joi.string().length(4).required(),
  }),
};

const updateRefKategoriJenazah = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
  body: Joi.object()
    .keys({
      kod_kategori_jenazah: Joi.string().length(4),
      label_ms: Joi.string().max(50),
      label_en: Joi.string().max(50),
      harga: Joi.number().precision(2).min(0),
      flag_aktif: Joi.number().valid(0, 1),
      updated_by: Joi.number().integer(),
    })
    .min(1),
};

const deleteRefKategoriJenazah = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

module.exports = {
  createRefKategoriJenazah,
  getRefKategoriJenazahs,
  getRefKategoriJenazah,
  updateRefKategoriJenazah,
  deleteRefKategoriJenazah,
};