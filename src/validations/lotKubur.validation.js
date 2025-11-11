const Joi = require('joi');

const createLotKubur = {
  body: Joi.object().keys({
    tapak_perkuburan_id: Joi.number().integer().required(),
    zon_id: Joi.number().integer().required(),
    kod_kategori_jenazah: Joi.string().length(4),
    kategori_jenazah_id: Joi.number().integer(),
    no_lot: Joi.string().max(50).default(''),
    kod_status_kubur: Joi.string().length(2).default('AV'),
    gis_id: Joi.number().integer(),
    created_by: Joi.number().integer().default(0),
    updated_by: Joi.number().integer().default(0),
  }),
};

const getLotKuburs = {
  query: Joi.object().keys({
    tapak_perkuburan_id: Joi.number().integer(),
    zon_id: Joi.number().integer(),
    kod_kategori_jenazah: Joi.string().length(4),
    kod_status_kubur: Joi.string().length(2),
    no_lot: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getLotKubur = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

const updateLotKubur = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
  body: Joi.object()
    .keys({
      tapak_perkuburan_id: Joi.number().integer(),
      zon_id: Joi.number().integer(),
      kod_kategori_jenazah: Joi.string().length(4),
      kategori_jenazah_id: Joi.number().integer(),
      no_lot: Joi.string().max(50),
      kod_status_kubur: Joi.string().length(2),
      gis_id: Joi.number().integer(),
      updated_by: Joi.number().integer(),
    })
    .min(1),
};

const deleteLotKubur = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

module.exports = {
  createLotKubur,
  getLotKuburs,
  getLotKubur,
  updateLotKubur,
  deleteLotKubur,
};