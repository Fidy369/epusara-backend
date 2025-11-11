const Joi = require('joi');

const createErrorLog = {
  body: Joi.object().keys({
    uuid: Joi.binary(),
    type: Joi.string().max(50).required(),
    message: Joi.string().required(),
    file: Joi.string().max(255).allow(null),
    line: Joi.number().integer().allow(null),
    trace: Joi.string().allow(null),
    context: Joi.string().max(255).allow(null),
    user_id: Joi.number().integer().allow(null),
    ip_address: Joi.string().max(45).allow(null),
    method: Joi.string().max(10).allow(null),
    url: Joi.string().max(255).allow(null),
  }),
};

const queryErrorLogs = {
  query: Joi.object().keys({
    type: Joi.string(),
    user_id: Joi.number().integer(),
    dateFrom: Joi.date().iso(),
    dateTo: Joi.date().iso(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getErrorLog = {
  params: Joi.object().keys({
    errorId: Joi.number().integer().required(),
  }),
};

const deleteErrorLog = {
  params: Joi.object().keys({
    errorId: Joi.number().integer().required(),
  }),
};

const clearOldErrorLogs = {
  query: Joi.object().keys({
    days: Joi.number().integer().min(1).max(365).default(30),
  }),
};

const getErrorStatistics = {
  query: Joi.object().keys({
    hours: Joi.number().integer().min(1).max(168).default(24),
  }),
};

module.exports = {
  createErrorLog,
  queryErrorLogs,
  getErrorLog,
  deleteErrorLog,
  clearOldErrorLogs,
  getErrorStatistics,
};