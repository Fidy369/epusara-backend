const httpStatus = require('http-status').default;
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { documentService } = require('../services');

const uploadDocument = catchAsync(async (req, res) => {
  if (!req.file) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'No file uploaded');
  }
  
  const userId = req.user ? req.user.id : 1; // Default to user 1 if no auth
  const document = await documentService.uploadDocument(req.file, userId);
  res.status(httpStatus.CREATED).send(document);
});

const getDocuments = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['mime_type', 'extension', 'uploaded_by']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await documentService.queryDocuments(filter, options);
  res.send(result);
});

const getDocument = catchAsync(async (req, res) => {
  const document = await documentService.getDocumentById(parseInt(req.params.documentId));
  if (!document) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Document not found');
  }
  res.send(document);
});

const getDocumentByUuid = catchAsync(async (req, res) => {
  const document = await documentService.getDocumentByUuid(req.params.uuid);
  if (!document) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Document not found');
  }
  res.send(document);
});

const downloadDocument = catchAsync(async (req, res) => {
  const document = await documentService.getDocumentByUuid(req.params.uuid);
  if (!document) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Document not found');
  }
  
  // Set appropriate headers for file download
  res.setHeader('Content-Type', document.mime_type);
  res.setHeader('Content-Disposition', `attachment; filename="${document.file_name}"`);
  
  // In a real implementation, you would stream the file from your storage
  // For now, we'll just return the document info
  res.send({
    message: 'File download would be implemented here',
    document: document
  });
});

const attachToApplication = catchAsync(async (req, res) => {
  const applicationDocument = await documentService.attachToApplication(
    parseInt(req.params.applicationId),
    req.body.attachment_id,
    req.body.jenis_dokumen
  );
  res.status(httpStatus.CREATED).send(applicationDocument);
});

const getDocumentsByApplication = catchAsync(async (req, res) => {
  const documents = await documentService.getDocumentsByApplication(parseInt(req.params.applicationId));
  res.send(documents);
});

const deleteDocument = catchAsync(async (req, res) => {
  await documentService.deleteDocumentById(parseInt(req.params.documentId));
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  uploadDocument,
  getDocuments,
  getDocument,
  getDocumentByUuid,
  downloadDocument,
  attachToApplication,
  getDocumentsByApplication,
  deleteDocument,
};