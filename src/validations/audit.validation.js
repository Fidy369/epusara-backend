const Joi = require('joi');

const queryAuditEvents = {
  query: Joi.object().keys({
    user_id: Joi.number().integer(),
    event: Joi.string(),
    ip_address: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getAuditTrail = {
  params: Joi.object().keys({
    objectType: Joi.string().required(),
    objectId: Joi.string().required(),
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

const getAuditLogById = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

const updateAuditLog = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
  body: Joi.object()
    .keys({
      event_id: Joi.number().integer(),
      object_type: Joi.string().max(50),
      object_id: Joi.string().max(50),
      changed_data: Joi.object().allow(null),
    })
    .min(1),
};

const replaceAuditLog = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
  body: Joi.object().keys({
    event_id: Joi.number().integer().required(),
    object_type: Joi.string().max(50).required(),
    object_id: Joi.string().max(50).required(),
    changed_data: Joi.object().allow(null),
  }),
};

const deleteAuditLog = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

module.exports = {
  queryAuditEvents,
  getAuditTrail,
  getAuditEventById,
  updateAuditEvent,
  replaceAuditEvent,
  deleteAuditEvent,
  getAuditLogById,
  updateAuditLog,
  replaceAuditLog,
  deleteAuditLog,
};