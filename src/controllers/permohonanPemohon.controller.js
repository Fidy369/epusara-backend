const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { permohonanPemohonService } = require('../services');

const createPermohonanPemohon = catchAsync(async (req, res) => {
  const result = await permohonanPemohonService.createPermohonanPemohon(req.body);
  res.status(httpStatus.CREATED).send(result);
});

const getPermohonanPemohon = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['permohonan_id', 'nama_pemohon', 'no_pengenalan', 'ref_hubungan_id', 'is_waris']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'sortType']);
  const result = await permohonanPemohonService.getPermohonanPemohon(filter, options);
  res.send(result);
});

const getPermohonanPemohonById = catchAsync(async (req, res) => {
  const result = await permohonanPemohonService.getPermohonanPemohonById(req.params.id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Permohonan pemohon not found');
  }
  res.send(result);
});

const updatePermohonanPemohon = catchAsync(async (req, res) => {
  const result = await permohonanPemohonService.updatePermohonanPemohonById(req.params.id, req.body);
  res.send(result);
});

const deletePermohonanPemohon = catchAsync(async (req, res) => {
  await permohonanPemohonService.deletePermohonanPemohonById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

const getByPermohonanId = catchAsync(async (req, res) => {
  const result = await permohonanPemohonService.getByPermohonanId(parseInt(req.params.permohonanId));
  res.send(result);
});

const getByHubungan = catchAsync(async (req, res) => {
  const result = await permohonanPemohonService.getByHubungan(parseInt(req.params.hubunganId));
  res.send(result);
});

module.exports = {
  createPermohonanPemohon,
  getPermohonanPemohon,
  getPermohonanPemohonById,
  updatePermohonanPemohon,
  deletePermohonanPemohon,
  getByPermohonanId,
  getByHubungan,
};