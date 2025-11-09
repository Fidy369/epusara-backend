const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { emailTemplateService } = require('../services');

const createEmailTemplate = catchAsync(async (req, res) => {
  const result = await emailTemplateService.createEmailTemplate(req.body);
  res.status(httpStatus.CREATED).send(result);
});

const getEmailTemplates = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['key', 'title']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'sortType']);
  const result = await emailTemplateService.getEmailTemplates(filter, options);
  res.send(result);
});

const getEmailTemplateById = catchAsync(async (req, res) => {
  const result = await emailTemplateService.getEmailTemplateById(req.params.id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Email template not found');
  }
  res.send(result);
});

const getEmailTemplateByKey = catchAsync(async (req, res) => {
  const result = await emailTemplateService.getEmailTemplateByKey(req.params.key);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Email template not found');
  }
  res.send(result);
});

const updateEmailTemplate = catchAsync(async (req, res) => {
  const result = await emailTemplateService.updateEmailTemplateById(req.params.id, req.body);
  res.send(result);
});

const deleteEmailTemplate = catchAsync(async (req, res) => {
  const emailTemplate = await emailTemplateService.getEmailTemplateById(req.params.id);
  if (!emailTemplate) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Email template not found');
  }
  await emailTemplateService.deleteEmailTemplateById(req.params.id);
  res.status(204).send();
});

const getActiveTemplates = catchAsync(async (req, res) => {
  const result = await emailTemplateService.getActiveTemplates();
  res.send(result);
});

const replaceEmailTemplate = catchAsync(async (req, res) => {
  const result = await emailTemplateService.replaceEmailTemplate(req.params.id, req.body);
  res.send(result);
});

module.exports = {
  createEmailTemplate,
  getEmailTemplates,
  getEmailTemplateById,
  getEmailTemplateByKey,
  updateEmailTemplate,
  deleteEmailTemplate,
  getActiveTemplates,
  replaceEmailTemplate,
};