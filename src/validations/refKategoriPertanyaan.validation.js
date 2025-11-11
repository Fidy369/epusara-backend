const Joi = require('joi');

const createRefKategoriPertanyaan = {
  body: Joi.object().keys({
    kod_kategori_pertanyaan: Joi.string().length(5).required(),
    label_ms: Joi.string().max(50).required(),
    label_en: Joi.string().max(50).required(),
    order_sequence: Joi.number().integer().min(0).default(0),
    is_active: Joi.boolean().default(false),
    created_by: Joi.number().integer().default(0),
    updated_by: Joi.number().integer().default(0),
  }),
};

const getRefKategoriPertanyaans = {
  query: Joi.object().keys({
    kod_kategori_pertanyaan: Joi.string().length(5),
    label_ms: Joi.string(),
    label_en: Joi.string(),
    is_active: Joi.boolean(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getRefKategoriPertanyaan = {
  params: Joi.object().keys({
    kod: Joi.string().length(5).required(),
  }),
};

const updateRefKategoriPertanyaan = {
  params: Joi.object().keys({
    kod: Joi.string().length(5).required(),
  }),
  body: Joi.object()
    .keys({
      label_ms: Joi.string().max(50),
      label_en: Joi.string().max(50),
      order_sequence: Joi.number().integer().min(0),
      is_active: Joi.boolean(),
      updated_by: Joi.number().integer(),
    })
    .min(1),
};

const deleteRefKategoriPertanyaan = {
  params: Joi.object().keys({
    kod: Joi.string().length(5).required(),
  }),
};

module.exports = {
  createRefKategoriPertanyaan,
  getRefKategoriPertanyaans,
  getRefKategoriPertanyaan,
  updateRefKategoriPertanyaan,
  deleteRefKategoriPertanyaan,
};