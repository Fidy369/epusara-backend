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

module.exports = {
  queryAuditEvents,
  getAuditTrail,
};