const Joi = require('joi');

const createPermohonanBayaran = {
  body: Joi.object().keys({
    no_akaun: Joi.string().allow(null, ''),
    no_bil_pelbagai: Joi.string().allow(null, ''),
    no_resit: Joi.string().allow(null, ''),
    permohonan_id: Joi.number().integer().required(),
    payment_deadline: Joi.date().allow(null),
    status_bayaran: Joi.string().valid('PENDING', 'UNPAID', 'PAID', 'FAILED').default('PENDING'),
    created_by: Joi.number().integer().default(0),
    updated_by: Joi.number().integer().default(0),
  }),
};

const getPermohonanBayaran = {
  query: Joi.object().keys({
    permohonan_id: Joi.number().integer(),
    status_bayaran: Joi.string().valid('PENDING', 'UNPAID', 'PAID', 'FAILED'),
    no_akaun: Joi.string(),
    no_resit: Joi.string(),
    sortBy: Joi.string(),
    sortType: Joi.string().valid('asc', 'desc'),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getPermohonanBayaranById = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

const updatePermohonanBayaran = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
  body: Joi.object()
    .keys({
      no_akaun: Joi.string().allow(null, ''),
      no_bil_pelbagai: Joi.string().allow(null, ''),
      no_resit: Joi.string().allow(null, ''),
      permohonan_id: Joi.number().integer(),
      payment_deadline: Joi.date().allow(null),
      status_bayaran: Joi.string().valid('PENDING', 'UNPAID', 'PAID', 'FAILED'),
      updated_by: Joi.number().integer(),
    })
    .min(1),
};

const deletePermohonanBayaran = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

const getByPermohonanId = {
  params: Joi.object().keys({
    permohonanId: Joi.number().integer().required(),
  }),
};

const getByStatus = {
  params: Joi.object().keys({
    status: Joi.string().required(),
  }),
};

module.exports = {
  createPermohonanBayaran,
  getPermohonanBayaran,
  getPermohonanBayaranById,
  updatePermohonanBayaran,
  deletePermohonanBayaran,
  getByPermohonanId,
  getByStatus,
};