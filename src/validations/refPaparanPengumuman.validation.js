const Joi = require('joi');

const createRefPaparanPengumuman = {
  body: Joi.object().keys({
    id: Joi.number().integer().required(),
    content_ms: Joi.string().required(),
    content_en: Joi.string().required(),
    is_active: Joi.boolean().required(),
    desktop_url: Joi.string().max(255).required(),
    thumnail_url: Joi.string().max(255).required(),
    mobile_url: Joi.string().max(255).required(),
    created_by: Joi.number().integer().required(),
    updated_by: Joi.number().integer().required(),
  }),
};

const getRefPaparanPengumumans = {
  query: Joi.object().keys({
    content_ms: Joi.string(),
    content_en: Joi.string(),
    is_active: Joi.boolean(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getRefPaparanPengumuman = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

const updateRefPaparanPengumuman = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
  body: Joi.object()
    .keys({
      content_ms: Joi.string(),
      content_en: Joi.string(),
      is_active: Joi.boolean(),
      desktop_url: Joi.string().max(255),
      thumnail_url: Joi.string().max(255),
      mobile_url: Joi.string().max(255),
      updated_by: Joi.number().integer(),
    })
    .min(1),
};

const deleteRefPaparanPengumuman = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

module.exports = {
  createRefPaparanPengumuman,
  getRefPaparanPengumumans,
  getRefPaparanPengumuman,
  updateRefPaparanPengumuman,
  deleteRefPaparanPengumuman,
};