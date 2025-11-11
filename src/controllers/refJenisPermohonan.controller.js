const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { refJenisPermohonanService } = require('../services');

const createRefJenisPermohonan = catchAsync(async (req, res) => {
  const result = await refJenisPermohonanService.createRefJenisPermohonan(req.body);
  res.status(201).send(result);
});

const getRefJenisPermohonans = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['is_active', 'label_ms', 'label_en']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'sortType']);
  const result = await refJenisPermohonanService.getRefJenisPermohonans(filter, options);
  res.send(result);
});

const getRefJenisPermohonan = catchAsync(async (req, res) => {
  const result = await refJenisPermohonanService.getRefJenisPermohonanByKod(req.params.kod);
  if (!result) {
    throw new ApiError(404, 'Reference jenis permohonan not found');
  }
  res.send(result);
});

const updateRefJenisPermohonan = catchAsync(async (req, res) => {
  const result = await refJenisPermohonanService.updateRefJenisPermohonanByKod(req.params.kod, req.body);
  res.send(result);
});

const deleteRefJenisPermohonan = catchAsync(async (req, res) => {
  await refJenisPermohonanService.deleteRefJenisPermohonanByKod(req.params.kod);
  res.status(204).send();
});

const getActiveRefJenisPermohonan = catchAsync(async (req, res) => {
  const result = await refJenisPermohonanService.getActiveRefJenisPermohonan();
  res.send(result);
});

module.exports = {
  createRefJenisPermohonan,
  getRefJenisPermohonans,
  getRefJenisPermohonan,
  updateRefJenisPermohonan,
  deleteRefJenisPermohonan,
};