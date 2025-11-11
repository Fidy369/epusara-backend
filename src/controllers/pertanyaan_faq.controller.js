const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { pertanyaanFaqService } = require('../services');

const createPertanyaanFaq = catchAsync(async (req, res) => {
  const result = await pertanyaanFaqService.createPertanyaanFaq(req.body);
  res.status(httpStatus.CREATED).send(result);
});

const getPertanyaanFaqs = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['kod_kategori_pertanyaan', 'is_active']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'sortType']);
  const result = await pertanyaanFaqService.getPertanyaanFaqs(filter, options);
  res.send(result);
});

const getPertanyaanFaq = catchAsync(async (req, res) => {
  const result = await pertanyaanFaqService.getPertanyaanFaqById(req.params.id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Pertanyaan FAQ not found');
  }
  res.send(result);
});

const updatePertanyaanFaq = catchAsync(async (req, res) => {
  const result = await pertanyaanFaqService.updatePertanyaanFaqById(req.params.id, req.body);
  res.send(result);
});

const deletePertanyaanFaq = catchAsync(async (req, res) => {
  await pertanyaanFaqService.deletePertanyaanFaqById(req.params.id);
  res.status(204).send();
});

module.exports = {
  createPertanyaanFaq,
  getPertanyaanFaqs,
  getPertanyaanFaq,
  updatePertanyaanFaq,
  deletePertanyaanFaq,
};