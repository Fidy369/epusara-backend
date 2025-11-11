const httpStatus = require('http-status').default;
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { refKategoriPertanyaanService } = require('../services');

const createRefKategoriPertanyaan = catchAsync(async (req, res) => {
  const result = await refKategoriPertanyaanService.createRefKategoriPertanyaan(req.body);
  res.status(201).send(result);
});

const getRefKategoriPertanyaans = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['kod_kategori_pertanyaan', 'label_ms', 'label_en', 'is_active']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await refKategoriPertanyaanService.getRefKategoriPertanyaans(filter, options);
  res.send(result);
});

const getRefKategoriPertanyaan = catchAsync(async (req, res) => {
  const result = await refKategoriPertanyaanService.getRefKategoriPertanyaanByKod(req.params.kod);
  if (!result) {
    throw new ApiError(404, 'Reference kategori pertanyaan not found');
  }
  res.send(result);
});

const getActiveCategories = catchAsync(async (req, res) => {
  const categories = await refKategoriPertanyaanService.getActiveCategories();
  res.send(categories);
});

const updateRefKategoriPertanyaan = catchAsync(async (req, res) => {
  const result = await refKategoriPertanyaanService.updateRefKategoriPertanyaanByKod(req.params.kod, req.body);
  res.send(result);
});

const deleteRefKategoriPertanyaan = catchAsync(async (req, res) => {
  await refKategoriPertanyaanService.deleteRefKategoriPertanyaanByKod(req.params.kod);
  res.status(204).send();
});

module.exports = {
  createRefKategoriPertanyaan,
  getRefKategoriPertanyaans,
  getRefKategoriPertanyaan,
  updateRefKategoriPertanyaan,
  deleteRefKategoriPertanyaan,
};