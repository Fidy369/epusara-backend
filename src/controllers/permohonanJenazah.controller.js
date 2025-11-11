const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { permohonanJenazahService } = require('../services');

const createPermohonanJenazah = catchAsync(async (req, res) => {
  const result = await permohonanJenazahService.createPermohonanJenazah(req.body);
  res.status(httpStatus.CREATED).send(result);
});

const getPermohonanJenazah = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['permohonan_id', 'nama_jenazah', 'no_pengenalan', 'ref_kategori_jenazah_id', 'kod_warganegara']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'sortType']);
  const result = await permohonanJenazahService.getPermohonanJenazah(filter, options);
  res.send(result);
});

const getPermohonanJenazahById = catchAsync(async (req, res) => {
  const result = await permohonanJenazahService.getPermohonanJenazahById(req.params.id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Permohonan jenazah not found');
  }
  res.send(result);
});

const updatePermohonanJenazah = catchAsync(async (req, res) => {
  const result = await permohonanJenazahService.updatePermohonanJenazahById(req.params.id, req.body);
  res.send(result);
});

const deletePermohonanJenazah = catchAsync(async (req, res) => {
  await permohonanJenazahService.deletePermohonanJenazahById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

const getByPermohonanId = catchAsync(async (req, res) => {
  const result = await permohonanJenazahService.getByPermohonanId(parseInt(req.params.permohonanId));
  res.send(result);
});

const getByKategoriJenazah = catchAsync(async (req, res) => {
  const result = await permohonanJenazahService.getByKategoriJenazah(parseInt(req.params.kategoriId));
  res.send(result);
});

module.exports = {
  createPermohonanJenazah,
  getPermohonanJenazah,
  getPermohonanJenazahById,
  updatePermohonanJenazah,
  deletePermohonanJenazah,
  getByPermohonanId,
  getByKategoriJenazah,
};