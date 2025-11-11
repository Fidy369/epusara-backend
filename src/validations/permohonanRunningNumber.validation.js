const Joi = require('joi');

const createRunningNumber = {
  body: Joi.object().keys({
    type: Joi.string().max(50).required(),
    date: Joi.date().required(),
    running_no: Joi.number().integer().required(),
  }),
};

const queryRunningNumbers = {
  query: Joi.object().keys({
    type: Joi.string(),
    date: Joi.date(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getRunningNumber = {
  params: Joi.object().keys({
    runningNumberId: Joi.number().integer().required(),
  }),
};

const getNextRunningNumber = {
  params: Joi.object().keys({
    type: Joi.string().required(),
  }),
  query: Joi.object().keys({
    date: Joi.date(),
  }),
};

const incrementRunningNumber = {
  params: Joi.object().keys({
    runningNumberId: Joi.number().integer().required(),
  }),
};

const resetRunningNumber = {
  params: Joi.object().keys({
    runningNumberId: Joi.number().integer().required(),
  }),
  body: Joi.object().keys({
    newNumber: Joi.number().integer().min(0).default(0),
  }),
};

const deleteRunningNumber = {
  params: Joi.object().keys({
    runningNumberId: Joi.number().integer().required(),
  }),
};

module.exports = {
  createRunningNumber,
  queryRunningNumbers,
  getRunningNumber,
  getNextRunningNumber,
  incrementRunningNumber,
  resetRunningNumber,
  deleteRunningNumber,
};