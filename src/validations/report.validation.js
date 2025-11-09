const Joi = require('joi');

const getApplicationStats = {
  query: Joi.object().keys({
    status_permohonan: Joi.string(),
    kod_jenis_permohonan: Joi.string(),
    start_date: Joi.date(),
    end_date: Joi.date(),
  }),
};

const getBurialLotStats = {
  query: Joi.object().keys({
    tapak_perkuburan_id: Joi.number().integer(),
    zon_id: Joi.number().integer(),
    kod_status_kubur: Joi.string(),
  }),
};

const getPaymentStats = {
  query: Joi.object().keys({
    status_bayaran: Joi.string(),
    permohonan_id: Joi.number().integer(),
    start_date: Joi.date(),
    end_date: Joi.date(),
  }),
};

const getQuestionStats = {
  query: Joi.object().keys({
    status: Joi.string().valid('N', 'A'),
    kod_kategori_pertanyaan: Joi.string(),
    start_date: Joi.date(),
    end_date: Joi.date(),
  }),
};

const getApplicationsByMonth = {
  query: Joi.object().keys({
    year: Joi.number().integer().min(2020).max(2030).optional(),
  }),
};

const getTopQuestionCategories = {
  query: Joi.object().keys({
    limit: Joi.number().integer().min(1).max(50).optional(),
  }),
};

const getRevenueReport = {
  query: Joi.object().keys({
    start_date: Joi.date(),
    end_date: Joi.date(),
    permohonan_id: Joi.number().integer(),
  }),
};

module.exports = {
  getApplicationStats,
  getBurialLotStats,
  getPaymentStats,
  getQuestionStats,
  getApplicationsByMonth,
  getTopQuestionCategories,
  getRevenueReport,
};