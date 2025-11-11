const Joi = require('joi');

const createPermohonanDokumen = {
  body: Joi.object().keys({
    permohonan_id: Joi.number().integer().required(),
    jenis_dokumen: Joi.string().max(50).required(),
    attachment_id: Joi.number().integer().allow(null).default(0),
    created_by: Joi.number().integer().default(0),
    updated_by: Joi.number().integer().default(0),
  }),
};

const getPermohonanDokumen = {
  query: Joi.object().keys({
    permohonan_id: Joi.number().integer(),
    jenis_dokumen: Joi.string(),
    attachment_id: Joi.number().integer(),
    sortBy: Joi.string(),
    sortType: Joi.string().valid('asc', 'desc'),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getPermohonanDokumenById = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

const updatePermohonanDokumen = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
  body: Joi.object()
    .keys({
      permohonan_id: Joi.number().integer(),
      jenis_dokumen: Joi.string().max(50),
      attachment_id: Joi.number().integer().allow(null),
      updated_by: Joi.number().integer(),
    })
    .min(1),
};

const deletePermohonanDokumen = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

const getByPermohonanId = {
  params: Joi.object().keys({
    permohonanId: Joi.number().integer().required(),
  }),
};

const getByJenisDokumen = {
  params: Joi.object().keys({
    jenisDokumen: Joi.string().required(),
  }),
};

module.exports = {
  createPermohonanDokumen,
  getPermohonanDokumen,
  getPermohonanDokumenById,
  updatePermohonanDokumen,
  deletePermohonanDokumen,
  getByPermohonanId,
  getByJenisDokumen,
};