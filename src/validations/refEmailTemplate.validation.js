const Joi = require('joi');

const createRefEmailTemplate = {
  body: Joi.object().keys({
    kod_email_template: Joi.string().max(50).required(),
    description: Joi.string().max(50).required(),
    title: Joi.string().max(50).required(),
    content: Joi.string().max(50).required(),
    is_active: Joi.boolean().default(false),
    created_by: Joi.number().integer().default(0),
    updated_by: Joi.number().integer().default(0),
  }),
};

const getRefEmailTemplates = {
  query: Joi.object().keys({
    kod_email_template: Joi.string(),
    is_active: Joi.boolean(),
    title: Joi.string(),
    sortBy: Joi.string(),
    sortType: Joi.string().valid('asc', 'desc'),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getRefEmailTemplate = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

const getRefEmailTemplateByKod = {
  params: Joi.object().keys({
    kod: Joi.string().required(),
  }),
};

const updateRefEmailTemplate = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
  body: Joi.object()
    .keys({
      kod_email_template: Joi.string().max(50),
      description: Joi.string().max(50),
      title: Joi.string().max(50),
      content: Joi.string().max(50),
      is_active: Joi.boolean(),
      updated_by: Joi.number().integer(),
    })
    .min(1),
};

const deleteRefEmailTemplate = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

module.exports = {
  createRefEmailTemplate,
  getRefEmailTemplates,
  getRefEmailTemplate,
  updateRefEmailTemplate,
  deleteRefEmailTemplate,
};