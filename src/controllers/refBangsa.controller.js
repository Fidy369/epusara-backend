const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { refBangsaService } = require('../services');

const createRefBangsa = catchAsync(async (req, res) => {
  const result = await refBangsaService.createRefBangsa(req.body);
  res.status(httpStatus.CREATED).send(result);
});

const getRefBangsas = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['is_active', 'label_ms', 'label_en']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'sortType']);
  const result = await refBangsaService.getRefBangsas(filter, options);
  res.send(result);
});

const getRefBangsa = catchAsync(async (req, res) => {
  const result = await refBangsaService.getRefBangsaById(req.params.id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Reference bangsa not found');
  }
  res.send(result);
});

const updateRefBangsa = catchAsync(async (req, res) => {
  const result = await refBangsaService.updateRefBangsaById(req.params.id, req.body);
  res.send(result);
});

const deleteRefBangsa = catchAsync(async (req, res) => {
  await refBangsaService.deleteRefBangsaById(req.params.id);
  res.status(204).send();
});

const getActiveRefBangsa = catchAsync(async (req, res) => {
  const result = await refBangsaService.getActiveRefBangsa();
  res.send(result);
});

const replaceRefBangsa = catchAsync(async (req, res) => {
  const result = await refBangsaService.replaceRefBangsaById(req.params.id, req.body);
  res.send(result);
});

module.exports = {
  createRefBangsa,
  getRefBangsas,
  getRefBangsa,
  getActiveRefBangsa,
  replaceRefBangsa,
  updateRefBangsa,
  deleteRefBangsa,
};