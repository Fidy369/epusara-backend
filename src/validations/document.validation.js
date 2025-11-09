const Joi = require('joi');

const uploadDocument = {
  // File validation will be handled by multer middleware
};

const getDocuments = {
  query: Joi.object().keys({
    mime_type: Joi.string(),
    extension: Joi.string(),
    uploaded_by: Joi.number().integer(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getDocument = {
  params: Joi.object().keys({
    documentId: Joi.number().integer().required(),
  }),
};

const getDocumentByUuid = {
  params: Joi.object().keys({
    uuid: Joi.string().uuid().required(),
  }),
};

const attachToApplication = {
  params: Joi.object().keys({
    applicationId: Joi.number().integer().required(),
  }),
  body: Joi.object().keys({
    attachment_id: Joi.number().integer().required(),
    jenis_dokumen: Joi.string().required(),
  }),
};

const getDocumentsByApplication = {
  params: Joi.object().keys({
    applicationId: Joi.number().integer().required(),
  }),
};

const deleteDocument = {
  params: Joi.object().keys({
    documentId: Joi.number().integer().required(),
  }),
};

module.exports = {
  uploadDocument,
  getDocuments,
  getDocument,
  getDocumentByUuid,
  attachToApplication,
  getDocumentsByApplication,
  deleteDocument,
};