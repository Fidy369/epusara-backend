const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { pertanyaanService } = require('../services');

const createPertanyaan = catchAsync(async (req, res) => {
  const result = await pertanyaanService.createPertanyaan(req.body);
  res.status(httpStatus.CREATED).send(result);
});

const getPertanyaans = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'email', 'kod_kategori_pertanyaan', 'status']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'sortType']);
  const result = await pertanyaanService.getPertanyaans(filter, options);
  res.send(result);
});

const getPertanyaan = catchAsync(async (req, res) => {
  const result = await pertanyaanService.getPertanyaanById(req.params.id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Pertanyaan not found');
  }
  res.send(result);
});

const updatePertanyaan = catchAsync(async (req, res) => {
  const result = await pertanyaanService.updatePertanyaanById(req.params.id, req.body);
  res.send(result);
});

const answerPertanyaan = catchAsync(async (req, res) => {
  const result = await pertanyaanService.answerPertanyaanById(req.params.id, req.body);
  res.send(result);
});

const deletePertanyaan = catchAsync(async (req, res) => {
  await pertanyaanService.deletePertanyaanById(req.params.id);
  res.status(204).send();
});

module.exports = {
  createPertanyaan,
  getPertanyaans,
  getPertanyaan,
  updatePertanyaan,
  answerPertanyaan,
  deletePertanyaan,
};