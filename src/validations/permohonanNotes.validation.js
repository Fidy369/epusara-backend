const Joi = require('joi');

const createPermohonanNotes = {
  body: Joi.object().keys({
    permohonan_id: Joi.number().integer().required(),
    type: Joi.string().max(50).required(),
    notes: Joi.string().max(500).required(),
    created_by: Joi.number().integer().required(),
    updated_by: Joi.number().integer().required(),
  }),
};

const getPermohonanNotes = {
  query: Joi.object().keys({
    permohonan_id: Joi.number().integer(),
    type: Joi.string(),
    sortBy: Joi.string(),
    sortType: Joi.string().valid('asc', 'desc'),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getPermohonanNotesById = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

const updatePermohonanNotes = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
  body: Joi.object()
    .keys({
      permohonan_id: Joi.number().integer(),
      type: Joi.string(),
      notes: Joi.string(),
      updated_by: Joi.number().integer(),
    })
    .min(1),
};

const deletePermohonanNotes = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

const getByPermohonanId = {
  params: Joi.object().keys({
    permohonanId: Joi.number().integer().required(),
  }),
};

const getByType = {
  params: Joi.object().keys({
    type: Joi.string().required(),
  }),
};

module.exports = {
  createPermohonanNotes,
  getPermohonanNotes,
  getPermohonanNotesById,
  updatePermohonanNotes,
  deletePermohonanNotes,
  getByPermohonanId,
  getByType,
};