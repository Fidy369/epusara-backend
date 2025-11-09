const httpStatus = require('http-status').default;
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { refKategoriJenazahService } = require('../services');

const createRefKategoriJenazah = catchAsync(async (req, res) => {
  const result = await refKategoriJenazahService.createRefKategoriJenazah(req.body);
  res.status(201).send(result);
});

const getRefKategoriJenazahs = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['kod_kategori_jenazah', 'label_ms', 'label_en', 'flag_aktif']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await refKategoriJenazahService.getRefKategoriJenazahs(filter, options);
  res.send(result);
});

const getRefKategoriJenazah = catchAsync(async (req, res) => {
  const result = await refKategoriJenazahService.getRefKategoriJenazahById(req.params.id);
  if (!result) {
    throw new ApiError(404, 'Reference kategori jenazah not found');
  }
  res.send(result);
});

const getCategoryByCode = catchAsync(async (req, res) => {
  const category = await refKategoriJenazahService.getCategoryByCode(req.params.code);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Deceased category not found');
  }
  res.send(category);
});

const getActiveCategories = catchAsync(async (req, res) => {
  const categories = await refKategoriJenazahService.getActiveCategories();
  res.send(categories);
});

const updateRefKategoriJenazah = catchAsync(async (req, res) => {
  const result = await refKategoriJenazahService.updateRefKategoriJenazahById(req.params.id, req.body);
  res.send(result);
});

// ADD THIS NEW CONTROLLER FOR PUT
const replaceRefKategoriJenazah = catchAsync(async (req, res) => {
  const result = await refKategoriJenazahService.replaceRefKategoriJenazahById(req.params.id, req.body);
  res.send(result);
});

const deleteRefKategoriJenazah = catchAsync(async (req, res) => {
  await refKategoriJenazahService.deleteRefKategoriJenazahById(req.params.id);
  res.status(204).send();
});

module.exports = {
  createRefKategoriJenazah,
  getRefKategoriJenazahs,
  getRefKategoriJenazah,
  updateRefKategoriJenazah,
  replaceRefKategoriJenazah, // ADD THIS
  deleteRefKategoriJenazah,
};