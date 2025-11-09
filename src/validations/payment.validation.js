const Joi = require('joi');

const createPayment = {
  body: Joi.object().keys({
    permohonan_id: Joi.number().integer().required(),
    no_akaun: Joi.string().optional(),
    no_bil_pelbagai: Joi.string().optional(),
    payment_deadline: Joi.date().optional(),
    status_bayaran: Joi.string().valid('PENDING', 'PAID', 'CANCELLED').optional(),
  }),
};

const getPayments = {
  query: Joi.object().keys({
    permohonan_id: Joi.number().integer(),
    status_bayaran: Joi.string().valid('PENDING', 'PAID', 'CANCELLED'),
    no_akaun: Joi.string(),
    no_resit: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getPayment = {
  params: Joi.object().keys({
    paymentId: Joi.number().integer().required(),
  }),
};

const getPaymentsByApplication = {
  params: Joi.object().keys({
    applicationId: Joi.number().integer().required(),
  }),
};

const updatePayment = {
  params: Joi.object().keys({
    paymentId: Joi.number().integer().required(),
  }),
  body: Joi.object()
    .keys({
      no_akaun: Joi.string(),
      no_bil_pelbagai: Joi.string(),
      no_resit: Joi.string(),
      payment_deadline: Joi.date(),
      status_bayaran: Joi.string().valid('PENDING', 'PAID', 'CANCELLED'),
    })
    .min(1),
};

const processPayment = {
  params: Joi.object().keys({
    paymentId: Joi.number().integer().required(),
  }),
  body: Joi.object().keys({
    no_resit: Joi.string().required(),
  }),
};

const cancelPayment = {
  params: Joi.object().keys({
    paymentId: Joi.number().integer().required(),
  }),
};

const deletePayment = {
  params: Joi.object().keys({
    paymentId: Joi.number().integer().required(),
  }),
};

const getPaymentSummary = {
  query: Joi.object().keys({
    permohonan_id: Joi.number().integer(),
    status_bayaran: Joi.string().valid('PENDING', 'PAID', 'CANCELLED'),
  }),
};

module.exports = {
  createPayment,
  getPayments,
  getPayment,
  getPaymentsByApplication,
  updatePayment,
  processPayment,
  cancelPayment,
  deletePayment,
  getPaymentSummary,
};