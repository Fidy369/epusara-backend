const Joi = require('joi');

const createRefNegeri = {
  body: Joi.object().keys({
    kod_negeri: Joi.string().length(2).required(),
    label: Joi.string().max(50).required(),
    is_active: Joi.boolean().default(false),
    created_by: Joi.number().integer().default(0),
    updated_by: Joi.number().integer().default(0),
  }),
};

const getRefNegeris = {
  query: Joi.object().keys({
    kod_negeri: Joi.string().length(2),
    label: Joi.string(),
    is_active: Joi.boolean(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getRefNegeri = {
  params: Joi.object().keys({
    kod: Joi.string().length(2).required(),
  }),
};

const updateRefNegeri = {
  params: Joi.object().keys({
    kod: Joi.string().length(2).required(),
  }),
  body: Joi.object()
    .keys({
      label: Joi.string().max(50),
      is_active: Joi.boolean(),
      updated_by: Joi.number().integer(),
    })
    .min(1),
};

const deleteRefNegeri = {
  params: Joi.object().keys({
    kod: Joi.string().length(2).required(),
  }),
};

module.exports = {
  createRefNegeri,
  getRefNegeris,
  getRefNegeri,
  updateRefNegeri,
  deleteRefNegeri,
};