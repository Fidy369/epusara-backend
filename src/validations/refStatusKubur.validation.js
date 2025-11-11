const Joi = require('joi');

const createRefStatusKubur = {
  body: Joi.object().keys({
    kod_status_kubur: Joi.string().length(2).required(),
    label_ms: Joi.string().max(50).required(),
    label_en: Joi.string().max(50).required(),
    color: Joi.string().max(7).required(),
    is_active: Joi.boolean().default(false),
    created_by: Joi.number().integer().default(0),
    updated_by: Joi.number().integer().default(0),
  }),
};

const getRefStatusKuburs = {
  query: Joi.object().keys({
    kod_status_kubur: Joi.string().length(2),
    label_ms: Joi.string(),
    label_en: Joi.string(),
    is_active: Joi.boolean(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getRefStatusKubur = {
  params: Joi.object().keys({
    kod: Joi.string().length(2).required(),
  }),
};

const updateRefStatusKubur = {
  params: Joi.object().keys({
    kod: Joi.string().length(2).required(),
  }),
  body: Joi.object()
    .keys({
      label_ms: Joi.string().max(50),
      label_en: Joi.string().max(50),
      color: Joi.string().max(7),
      is_active: Joi.boolean(),
      updated_by: Joi.number().integer(),
    })
    .min(1),
};

const deleteRefStatusKubur = {
  params: Joi.object().keys({
    kod: Joi.string().length(2).required(),
  }),
};

module.exports = {
  createRefStatusKubur,
  getRefStatusKuburs,
  getRefStatusKubur,
  updateRefStatusKubur,
  deleteRefStatusKubur,
};