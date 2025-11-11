const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { refNegeriService } = require('../services');

const createRefNegeri = catchAsync(async (req, res) => {
  const result = await refNegeriService.createRefNegeri(req.body);
  res.status(201).send(result);
});

const getRefNegeris = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['kod_negeri', 'label', 'is_active']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await refNegeriService.getRefNegeris(filter, options);
  res.send(result);
});

const getRefNegeri = catchAsync(async (req, res) => {
  const result = await refNegeriService.getRefNegeriByKod(req.params.kod);
  if (!result) {
    throw new ApiError(404, 'Reference negeri not found');
  }
  res.send(result);
});

const updateRefNegeri = catchAsync(async (req, res) => {
  const result = await refNegeriService.updateRefNegeriByKod(req.params.kod, req.body);
  res.send(result);
});

const deleteRefNegeri = catchAsync(async (req, res) => {
  await refNegeriService.deleteRefNegeriByKod(req.params.kod);
  res.status(204).send();
});

module.exports = {
  createRefNegeri,
  getRefNegeris,
  getRefNegeri,
  updateRefNegeri,
  deleteRefNegeri,
};