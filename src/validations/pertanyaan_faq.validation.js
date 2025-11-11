const Joi = require('joi');

const createPertanyaanFaq = {
  body: Joi.object().keys({
    kod_kategori_pertanyaan: Joi.string().length(5).required(),
    question_ms: Joi.string().max(500).required(),
    answer_ms: Joi.string().max(1000).required(),
    question_en: Joi.string().max(500).required(),
    answer_en: Joi.string().max(1000).required(),
    order: Joi.number().integer().min(0).default(0),
    is_active: Joi.boolean().default(false),
    created_by: Joi.number().integer().default(0),
    updated_by: Joi.number().integer().default(0),
  }),
};

const getPertanyaanFaqs = {
  query: Joi.object().keys({
    kod_kategori_pertanyaan: Joi.string().length(5),
    is_active: Joi.boolean(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getPertanyaanFaq = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

const getPertanyaanFaqsByCategory = {
  params: Joi.object().keys({
    categoryCode: Joi.string().length(5).required(),
  }),
};

const updatePertanyaanFaq = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
  body: Joi.object()
    .keys({
      kod_kategori_pertanyaan: Joi.string().length(5),
      question_ms: Joi.string().max(500),
      answer_ms: Joi.string().max(1000),
      question_en: Joi.string().max(500),
      answer_en: Joi.string().max(1000),
      order: Joi.number().integer().min(0),
      is_active: Joi.boolean(),
      updated_by: Joi.number().integer(),
    })
    .min(1),
};

const deletePertanyaanFaq = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

module.exports = {
  createPertanyaanFaq,
  getPertanyaanFaqs,
  getPertanyaanFaq,
  getPertanyaanFaqsByCategory,
  updatePertanyaanFaq,
  deletePertanyaanFaq,
};