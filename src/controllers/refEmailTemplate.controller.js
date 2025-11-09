const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { refEmailTemplateService } = require('../services');

const createRefEmailTemplate = catchAsync(async (req, res) => {
  const result = await refEmailTemplateService.createRefEmailTemplate(req.body);
  res.status(201).send(result);
});

const getRefEmailTemplates = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['kod_email_template', 'is_active', 'title']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'sortType']);
  const result = await refEmailTemplateService.getRefEmailTemplates(filter, options);
  res.send(result);
});

const getRefEmailTemplate = catchAsync(async (req, res) => {
  const result = await refEmailTemplateService.getRefEmailTemplateById(req.params.id);
  if (!result) {
    throw new ApiError(404, 'Reference email template not found');
  }
  res.send(result);
});

const getRefEmailTemplateByKod = catchAsync(async (req, res) => {
  const result = await refEmailTemplateService.getRefEmailTemplateByKod(req.params.kod);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Reference email template not found');
  }
  res.send(result);
});

const updateRefEmailTemplate = catchAsync(async (req, res) => {
  const result = await refEmailTemplateService.updateRefEmailTemplateById(req.params.id, req.body);
  res.send(result);
});

const deleteRefEmailTemplate = catchAsync(async (req, res) => {
  await refEmailTemplateService.deleteRefEmailTemplateById(req.params.id);
  res.status(204).send();
});

const getActiveTemplates = catchAsync(async (req, res) => {
  const result = await refEmailTemplateService.getActiveTemplates();
  res.send(result);
});

const replaceRefEmailTemplate = catchAsync(async (req, res) => {
  const result = await refEmailTemplateService.replaceRefEmailTemplateById(req.params.id, req.body);
  res.send(result);
});

module.exports = {
  createRefEmailTemplate,
  getRefEmailTemplates,
  getRefEmailTemplate,
  getRefEmailTemplateByKod,
  getActiveTemplates,
  replaceRefEmailTemplate,
  updateRefEmailTemplate,
  deleteRefEmailTemplate,
};