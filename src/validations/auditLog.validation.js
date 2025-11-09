const Joi = require('joi');

const createAuditLog = {
  body: Joi.object().keys({
    event_id: Joi.number().integer().required(),
    object_type: Joi.string().max(50).required(),
    object_id: Joi.string().max(50).required(),
    changed_data: Joi.object().allow(null),
  }),
};

const getAuditLogs = {
  query: Joi.object().keys({
    event_id: Joi.number().integer(),
    object_type: Joi.string(),
    object_id: Joi.string(),
    sortBy: Joi.string(),
    sortType: Joi.string().valid('asc', 'desc'),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
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

const deleteAuditLog = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

const getByEventId = {
  params: Joi.object().keys({
    eventId: Joi.number().integer().required(),
  }),
};

const getByObjectType = {
  params: Joi.object().keys({
    objectType: Joi.string().required(),
  }),
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

module.exports = {
  createAuditLog,
  getAuditLogs,
  getAuditLogById,
  updateAuditLog,
  replaceAuditLog,
  deleteAuditLog,
  getByEventId,
  getByObjectType,
};