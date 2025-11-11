const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { refBahagianBadanService } = require('../services');

const createRefBahagianBadan = catchAsync(async (req, res) => {
  const result = await refBahagianBadanService.createRefBahagianBadan(req.body);
  res.status(httpStatus.CREATED).send(result);
});

const getRefBahagianBadans = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['is_active', 'label_ms', 'label_en']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'sortType']);
  const result = await refBahagianBadanService.getRefBahagianBadans(filter, options);
  res.send(result);
});

const getRefBahagianBadan = catchAsync(async (req, res) => {
  const result = await refBahagianBadanService.getRefBahagianBadanById(req.params.id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Reference bahagian badan not found');
  }
  res.send(result);
});

const updateRefBahagianBadan = catchAsync(async (req, res) => {
  const result = await refBahagianBadanService.updateRefBahagianBadanById(req.params.id, req.body);
  res.send(result);
});

const deleteRefBahagianBadan = catchAsync(async (req, res) => {
  await refBahagianBadanService.deleteRefBahagianBadanById(req.params.id);
  res.status(204).send();
});

const getActiveRefBahagianBadan = catchAsync(async (req, res) => {
  const result = await refBahagianBadanService.getActiveRefBahagianBadan();
  res.send(result);
});

module.exports = {
  createRefBahagianBadan,
  getRefBahagianBadans,
  getRefBahagianBadan,
  updateRefBahagianBadan,
  deleteRefBahagianBadan,
};