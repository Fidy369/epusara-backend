const Joi = require('joi');

const createAuditEvent = {
  body: Joi.object().keys({
    user_id: Joi.number().integer().allow(null),
    ip_address: Joi.string().max(45).allow(null),
    event: Joi.string().max(50).required(),
    description: Joi.string().max(500).allow(null),
  }),
};

const getAuditEvents = {
  query: Joi.object().keys({
    user_id: Joi.number().integer(),
    event: Joi.string(),
    ip_address: Joi.string(),
    sortBy: Joi.string(),
    sortType: Joi.string().valid('asc', 'desc'),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getAuditEventById = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

const updateAuditEvent = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
  body: Joi.object()
    .keys({
      user_id: Joi.number().integer().allow(null),
      ip_address: Joi.string().max(45).allow(null),
      event: Joi.string().max(50),
      description: Joi.string().max(500).allow(null),
    })
    .min(1),
};

const replaceAuditEvent = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
  body: Joi.object().keys({
    user_id: Joi.number().integer().allow(null),
    ip_address: Joi.string().max(45).allow(null),
    event: Joi.string().max(50).required(),
    description: Joi.string().max(500).allow(null),
  }),
};

const deleteAuditEvent = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

const getByUserId = {
  params: Joi.object().keys({
    userId: Joi.number().integer().required(),
  }),
};

const getByEvent = {
  params: Joi.object().keys({
    event: Joi.string().required(),
  }),
};

module.exports = {
  createAuditEvent,
  getAuditEvents,
  getAuditEventById,
  updateAuditEvent,
  replaceAuditEvent,
  deleteAuditEvent,
  getByUserId,
  getByEvent,
};