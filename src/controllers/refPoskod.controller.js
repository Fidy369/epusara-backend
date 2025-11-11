const httpStatus = require('http-status').default;
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { refPoskodService } = require('../services');

const createPostalCode = catchAsync(async (req, res) => {
  const postalCode = await refPoskodService.createPostalCode(req.body);
  res.status(httpStatus.CREATED).send(postalCode);
});

const getPostalCodes = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['poskod', 'bandar', 'daerah', 'kod_negeri', 'is_active']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await refPoskodService.queryPostalCodes(filter, options);
  res.send(result);
});

const getPostalCode = catchAsync(async (req, res) => {
  const postalCode = await refPoskodService.getPostalCodeById(req.params.postalCodeId);
  if (!postalCode) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Postal code not found');
  }
  res.send(postalCode);
});

const getPostalCodeByCode = catchAsync(async (req, res) => {
  const postalCode = await refPoskodService.getPostalCodeByCode(req.params.code);
  if (!postalCode) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Postal code not found');
  }
  res.send(postalCode);
});

const getActivePostalCodes = catchAsync(async (req, res) => {
  const postalCodes = await refPoskodService.getActivePostalCodes();
  res.send(postalCodes);
});

const getPostalCodesByState = catchAsync(async (req, res) => {
  const postalCodes = await refPoskodService.getPostalCodesByState(req.params.stateCode);
  res.send(postalCodes);
});

const updatePostalCode = catchAsync(async (req, res) => {
  const postalCode = await refPoskodService.updatePostalCodeById(req.params.postalCodeId, req.body);
  res.send(postalCode);
});

const deletePostalCode = catchAsync(async (req, res) => {
  await refPoskodService.deletePostalCodeById(req.params.postalCodeId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createPostalCode,
  getPostalCodes,
  getPostalCode,
  getPostalCodeByCode,
  getActivePostalCodes,
  getPostalCodesByState,
  updatePostalCode,
  deletePostalCode,
};