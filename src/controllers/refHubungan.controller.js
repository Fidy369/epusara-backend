const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { refHubunganService } = require('../services');

const createRefHubungan = catchAsync(async (req, res) => {
  const result = await refHubunganService.createRefHubungan(req.body);
  res.status(201).send(result);
});

const getRefHubungans = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['is_active', 'label_ms', 'label_en']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'sortType']);
  const result = await refHubunganService.getRefHubungans(filter, options);
  res.send(result);
});

const getRefHubungan = catchAsync(async (req, res) => {
  const result = await refHubunganService.getRefHubunganById(req.params.id);
  if (!result) {
    throw new ApiError(404, 'Reference hubungan not found');
  }
  res.send(result);
});

const updateRefHubungan = catchAsync(async (req, res) => {
  const result = await refHubunganService.updateRefHubunganById(req.params.id, req.body);
  res.send(result);
});

const deleteRefHubungan = catchAsync(async (req, res) => {
  await refHubunganService.deleteRefHubunganById(req.params.id);
  res.status(204).send();
});

const getActiveRefHubungan = catchAsync(async (req, res) => {
  const result = await refHubunganService.getActiveRefHubungan();
  res.send(result);
});

const replaceRefHubungan = catchAsync(async (req, res) => {
  const result = await refHubunganService.replaceRefHubunganById(req.params.id, req.body);
  res.send(result);
});

module.exports = {
  createRefHubungan,
  getRefHubungans,
  getRefHubungan,
  getActiveRefHubungan,
  replaceRefHubungan,
  updateRefHubungan,
  deleteRefHubungan,
};