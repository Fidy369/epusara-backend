const Joi = require('joi');

const createPertanyaan = {
  body: Joi.object().keys({
    uuid: Joi.binary(),
    name: Joi.string().max(255).required(),
    phone_no: Joi.string().max(50).required(),
    email: Joi.string().email().max(50).required(),
    kod_kategori_pertanyaan: Joi.string().length(5).required(),
    question: Joi.string().max(1000).required(),
    status: Joi.string().valid('N', 'A').default('N'),
    notes: Joi.string().max(500).allow(null),
  }),
};

const getPertanyaans = {
  query: Joi.object().keys({
    status: Joi.string().valid('N', 'A'),
    kod_kategori_pertanyaan: Joi.string().length(5),
    name: Joi.string(),
    email: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getPertanyaan = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

const updatePertanyaan = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().max(255),
      phone_no: Joi.string().max(50),
      email: Joi.string().email().max(50),
      kod_kategori_pertanyaan: Joi.string().length(5),
      question: Joi.string().max(1000),
      status: Joi.string().valid('N', 'A'),
      notes: Joi.string().max(500).allow(null),
      answered_by: Joi.number().integer().allow(null),
    })
    .min(1),
};

const answerPertanyaan = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
  body: Joi.object().keys({
    notes: Joi.string().max(500).required(),
    answered_by: Joi.number().integer().required(),
  }),
};

const deletePertanyaan = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

module.exports = {
  createPertanyaan,
  getPertanyaans,
  getPertanyaan,
  updatePertanyaan,
  answerPertanyaan,
  deletePertanyaan,
};