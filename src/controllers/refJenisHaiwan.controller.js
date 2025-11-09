const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { refJenisHaiwanService } = require('../services');

const createRefJenisHaiwan = catchAsync(async (req, res) => {
  const result = await refJenisHaiwanService.createRefJenisHaiwan(req.body);
  res.status(201).send(result);
});

const getRefJenisHaiwans = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['is_active', 'kod_jenis_haiwan', 'label_ms', 'label_en']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'sortType']);
  const result = await refJenisHaiwanService.getRefJenisHaiwans(filter, options);
  res.send(result);
});

const getRefJenisHaiwan = catchAsync(async (req, res) => {
  const result = await refJenisHaiwanService.getRefJenisHaiwanById(req.params.id);
  if (!result) {
    throw new ApiError(404, 'Reference jenis haiwan not found');
  }
  res.send(result);
});

const getRefJenisHaiwanByKod = catchAsync(async (req, res) => {
  const result = await refJenisHaiwanService.getRefJenisHaiwanByKod(req.params.kod);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Reference jenis haiwan not found');
  }
  res.send(result);
});

const updateRefJenisHaiwan = catchAsync(async (req, res) => {
  const result = await refJenisHaiwanService.updateRefJenisHaiwanById(req.params.id, req.body);
  res.send(result);
});

const deleteRefJenisHaiwan = catchAsync(async (req, res) => {
  await refJenisHaiwanService.deleteRefJenisHaiwanById(req.params.id);
  res.status(204).send();
});

const getActiveRefJenisHaiwan = catchAsync(async (req, res) => {
  const result = await refJenisHaiwanService.getActiveRefJenisHaiwan();
  res.send(result);
});

const replaceRefJenisHaiwan = catchAsync(async (req, res) => {
  const result = await refJenisHaiwanService.replaceRefJenisHaiwanById(req.params.id, req.body);
  res.send(result);
});

module.exports = {
  createRefJenisHaiwan,
  getRefJenisHaiwans,
  getRefJenisHaiwan,
  getRefJenisHaiwanByKod,
  getActiveRefJenisHaiwan,
  replaceRefJenisHaiwan,
  updateRefJenisHaiwan,
  deleteRefJenisHaiwan,
};