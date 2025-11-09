const Joi = require('joi');

const createFAQ = {
  body: Joi.object().keys({
    kod_kategori_pertanyaan: Joi.string().length(5).required(),
    question_ms: Joi.string().required(),
    answer_ms: Joi.string().required(),
    question_en: Joi.string().required(),
    answer_en: Joi.string().required(),
    order: Joi.number().integer().default(0),
    is_active: Joi.boolean().default(true),
  }),
};

const queryFAQs = {
  query: Joi.object().keys({
    kod_kategori_pertanyaan: Joi.string().length(5),
    is_active: Joi.string().valid('true', 'false'),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getFAQ = {
  params: Joi.object().keys({
    faqId: Joi.number().integer().required(),
  }),
};

const updateFAQ = {
  params: Joi.object().keys({
    faqId: Joi.number().integer().required(),
  }),
  body: Joi.object().keys({
    kod_kategori_pertanyaan: Joi.string().length(5),
    question_ms: Joi.string(),
    answer_ms: Joi.string(),
    question_en: Joi.string(),
    answer_en: Joi.string(),
    order: Joi.number().integer(),
    is_active: Joi.boolean(),
  }),
};

const deleteFAQ = {
  params: Joi.object().keys({
    faqId: Joi.number().integer().required(),
  }),
};

const getActiveFAQsByCategory = {
  params: Joi.object().keys({
    categoryCode: Joi.string().length(5).required(),
  }),
};

module.exports = {
  createFAQ,
  queryFAQs,
  getFAQ,
  updateFAQ,
  deleteFAQ,
  getActiveFAQsByCategory,
};