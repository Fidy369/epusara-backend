const Joi = require('joi');

const createEmailQueue = {
  body: Joi.object().keys({
    recipient: Joi.string().email().max(255).required(),
    subject: Joi.string().max(255).required(),
    body: Joi.string().required(),
    status: Joi.string().valid('pending', 'sent', 'failed').default('pending'),
    attempts: Joi.number().integer().min(0).default(0),
    last_error: Joi.string().allow(null, ''),
  }),
};

const getEmailQueues = {
  query: Joi.object().keys({
    recipient: Joi.string().email(),
    status: Joi.string().valid('pending', 'sent', 'failed'),
    subject: Joi.string(),
    sortBy: Joi.string(),
    sortType: Joi.string().valid('asc', 'desc'),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getEmailQueue = {
  params: Joi.object().keys({
    emailQueueId: Joi.number().integer().required(),
  }),
};

const updateEmailQueue = {
  params: Joi.object().keys({
    emailQueueId: Joi.number().integer().required(),
  }),
  body: Joi.object()
    .keys({
      recipient: Joi.string().email().max(255),
      subject: Joi.string().max(255),
      body: Joi.string(),
      status: Joi.string().valid('pending', 'sent', 'failed'),
      attempts: Joi.number().integer().min(0),
      last_error: Joi.string().allow(null, ''),
    })
    .min(1),
};

const deleteEmailQueue = {
  params: Joi.object().keys({
    emailQueueId: Joi.number().integer().required(),
  }),
};

const getEmailQueuesByStatus = {
  params: Joi.object().keys({
    status: Joi.string().valid('pending', 'sent', 'failed').required(),
  }),
};

const updateEmailQueueStatus = {
  params: Joi.object().keys({
    emailQueueId: Joi.number().integer().required(),
  }),
  body: Joi.object().keys({
    status: Joi.string().valid('pending', 'sent', 'failed').required(),
    sentAt: Joi.date().allow(null),
    lastError: Joi.string().allow(null, ''),
  }),
};

const incrementAttempts = {
  params: Joi.object().keys({
    emailQueueId: Joi.number().integer().required(),
  }),
};

const replaceEmailQueue = {
  params: Joi.object().keys({
    emailQueueId: Joi.number().integer().required(),
  }),
  body: Joi.object().keys({
    recipient: Joi.string().email().max(255).required(),
    subject: Joi.string().max(255).required(),
    body: Joi.string().required(),
    status: Joi.string().valid('pending', 'sent', 'failed').required(),
    attempts: Joi.number().integer().min(0).default(0),
    last_error: Joi.string().allow(null, ''),
  }),
};

module.exports = {
  createEmailQueue,
  getEmailQueues,
  getEmailQueue,
  updateEmailQueue,
  deleteEmailQueue,
  getEmailQueuesByStatus,
  updateEmailQueueStatus,
  incrementAttempts,
  replaceEmailQueue,
};