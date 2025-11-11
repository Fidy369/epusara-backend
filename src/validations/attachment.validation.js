const Joi = require('joi');

const createAttachment = {
  body: Joi.object().keys({
    uuid: Joi.binary(),
    file_name: Joi.string().required(),
    file_size: Joi.number().integer().min(0).default(0),
    file_path: Joi.string().default('0'),
    mime_type: Joi.string().required(),
    extension: Joi.string().required(),
    uploaded_by: Joi.number().integer().default(0),
  }),
};

const getAttachments = {
  query: Joi.object().keys({
    file_name: Joi.string(),
    mime_type: Joi.string(),
    extension: Joi.string(),
    uploaded_by: Joi.number().integer(),
    sortBy: Joi.string(),
    sortType: Joi.string().valid('asc', 'desc'),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getAttachment = {
  params: Joi.object().keys({
    attachmentId: Joi.number().integer().required(),
  }),
};

const getAttachmentByUuid = {
  params: Joi.object().keys({
    uuid: Joi.string().required(),
  }),
};

const updateAttachment = {
  params: Joi.object().keys({
    attachmentId: Joi.number().integer().required(),
  }),
  body: Joi.object()
    .keys({
      file_name: Joi.string(),
      file_size: Joi.number().integer().min(0),
      file_path: Joi.string(),
      mime_type: Joi.string(),
      extension: Joi.string(),
      uploaded_by: Joi.number().integer(),
    })
    .min(1),
};

const deleteAttachment = {
  params: Joi.object().keys({
    attachmentId: Joi.number().integer().required(),
  }),
};

const getAttachmentsByType = {
  params: Joi.object().keys({
    mimeType: Joi.string().required(),
  }),
};

const getAttachmentsByUploader = {
  params: Joi.object().keys({
    uploadedBy: Joi.number().integer().required(),
  }),
};

module.exports = {
  createAttachment,
  getAttachments,
  getAttachment,
  getAttachmentByUuid,
  updateAttachment,
  deleteAttachment,
  getAttachmentsByType,
  getAttachmentsByUploader,
};