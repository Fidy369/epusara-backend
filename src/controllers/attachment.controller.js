const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { attachmentService } = require('../services');

const createAttachment = catchAsync(async (req, res) => {
  const attachment = await attachmentService.createAttachment(req.body);
  res.status(httpStatus.CREATED).send(attachment);
});

const getAttachments = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['file_name', 'mime_type', 'extension', 'uploaded_by']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'sortType']);
  const result = await attachmentService.getAttachments(filter, options);
  res.send(result);
});

const getAttachment = catchAsync(async (req, res) => {
  const attachment = await attachmentService.getAttachmentById(req.params.attachmentId);
  if (!attachment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Attachment not found');
  }
  res.send(attachment);
});

const getAttachmentByUuid = catchAsync(async (req, res) => {
  const attachment = await attachmentService.getAttachmentByUuid(req.params.uuid);
  if (!attachment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Attachment not found');
  }
  res.send(attachment);
});

const updateAttachment = catchAsync(async (req, res) => {
  const attachment = await attachmentService.updateAttachmentById(req.params.attachmentId, req.body);
  res.send(attachment);
});

const deleteAttachment = catchAsync(async (req, res) => {
  await attachmentService.deleteAttachmentById(req.params.attachmentId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getAttachmentsByType = catchAsync(async (req, res) => {
  const result = await attachmentService.getAttachmentsByType(req.params.mimeType);
  res.send(result);
});

const getAttachmentsByUploader = catchAsync(async (req, res) => {
  const result = await attachmentService.getAttachmentsByUploader(parseInt(req.params.uploadedBy));
  res.send(result);
});

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