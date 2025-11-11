const Joi = require('joi');

const createEmailTemplate = {
  body: Joi.object().keys({
    key: Joi.string().max(50).required(),
    description: Joi.string().max(255).allow(null),
    title: Joi.string().max(255).required(),
    content: Joi.string().max(5000).required(),
  }),
};

const getEmailTemplates = {
  query: Joi.object().keys({
    key: Joi.string(),
    title: Joi.string(),
    sortBy: Joi.string(),
    sortType: Joi.string().valid('asc', 'desc'),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getEmailTemplateById = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

const getEmailTemplateByKey = {
  params: Joi.object().keys({
    key: Joi.string().required(),
  }),
};

const updateEmailTemplate = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
  body: Joi.object()
    .keys({
      key: Joi.string().max(50),
      description: Joi.string().max(255).allow(null),
      title: Joi.string().max(255),
      content: Joi.string().max(5000),
    })
    .min(1),
};

const deleteEmailTemplate = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

module.exports = {
  createEmailTemplate,
  getEmailTemplates,
  getEmailTemplateById,
  getEmailTemplateByKey,
  updateEmailTemplate,
  deleteEmailTemplate,
};