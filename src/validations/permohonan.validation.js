const Joi = require('joi');

const createPermohonan = {
  body: Joi.object().keys({
    kod_jenis_permohonan: Joi.string().length(2).required(),
    ref_kategori_jenazah_id: Joi.number().integer().required(),
    applicant: Joi.object().keys({
      nama_pemohon: Joi.string().required(),
      jenis_pengenalan: Joi.string().required(),
      no_pengenalan: Joi.string().required(),
      ref_hubungan_id: Joi.number().integer().required(),
      hubungan_lain: Joi.string().optional(),
      is_waris: Joi.boolean().optional(),
      phone: Joi.string().required(),
      email: Joi.string().email().required(),
      address1: Joi.string().required(),
      address2: Joi.string().optional(),
      address3: Joi.string().optional(),
      poskod: Joi.string().required(),
    }).optional(),
    deceased: Joi.object().keys({
      nama_jenazah: Joi.string().required(),
      kod_warganegara: Joi.string().length(2).required(),
      jenis_pengenalan: Joi.string().required(),
      no_pengenalan: Joi.string().required(),
      ref_bangsa_id: Joi.number().integer().required(),
      kod_jantina: Joi.string().required(),
      ref_kategori_jenazah_id: Joi.number().integer().optional(),
      tarikh_lahir: Joi.date().required(),
      masa_sah_kematian: Joi.date().optional(),
      address1: Joi.string().required(),
      address2: Joi.string().optional(),
      address3: Joi.string().optional(),
      poskod: Joi.string().optional(),
    }).optional(),
  }),
};

const getPermohonans = {
  query: Joi.object().keys({
    status_permohonan: Joi.string().valid('DRAFT', 'IN_PROGRESS', 'APPROVED', 'REJECTED', 'CANCELLED', 'FINISHED'),
    kod_jenis_permohonan: Joi.string().length(2),
    no_permohonan: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getPermohonan = {
  params: Joi.object().keys({
    permohonanId: Joi.number().integer().required(),
  }),
};

const updatePermohonan = {
  params: Joi.object().keys({
    permohonanId: Joi.number().integer().required(),
  }),
  body: Joi.object()
    .keys({
      status_permohonan: Joi.string().valid('DRAFT', 'IN_PROGRESS', 'APPROVED', 'REJECTED', 'CANCELLED', 'FINISHED'),
      ref_kategori_jenazah_id: Joi.number().integer(),
    })
    .min(1),
};

const submitPermohonan = {
  params: Joi.object().keys({
    permohonanId: Joi.number().integer().required(),
  }),
};

const approvePermohonan = {
  params: Joi.object().keys({
    permohonanId: Joi.number().integer().required(),
  }),
  body: Joi.object().keys({
    notes: Joi.string().optional(),
  }),
};

const rejectPermohonan = {
  params: Joi.object().keys({
    permohonanId: Joi.number().integer().required(),
  }),
  body: Joi.object().keys({
    notes: Joi.string().required(),
  }),
};

const deletePermohonan = {
  params: Joi.object().keys({
    permohonanId: Joi.number().integer().required(),
  }),
};

module.exports = {
  createPermohonan,
  getPermohonans,
  getPermohonan,
  updatePermohonan,
  submitPermohonan,
  approvePermohonan,
  rejectPermohonan,
  deletePermohonan,
};