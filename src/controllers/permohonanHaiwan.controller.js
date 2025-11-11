const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { permohonanHaiwanService } = require('../services');

const createPermohonanHaiwan = catchAsync(async (req, res) => {
  const result = await permohonanHaiwanService.createPermohonanHaiwan(req.body);
  res.status(httpStatus.CREATED).send(result);
});

const getPermohonanHaiwan = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['permohonan_id', 'ref_jenis_haiwan_kod']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'sortType']);
  const result = await permohonanHaiwanService.getPermohonanHaiwan(filter, options);
  res.send(result);
});

const getPermohonanHaiwanById = catchAsync(async (req, res) => {
  const result = await permohonanHaiwanService.getPermohonanHaiwanById(req.params.id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Permohonan haiwan not found');
  }
  res.send(result);
});

const updatePermohonanHaiwan = catchAsync(async (req, res) => {
  const result = await permohonanHaiwanService.updatePermohonanHaiwanById(req.params.id, req.body);
  res.send(result);
});

const deletePermohonanHaiwan = catchAsync(async (req, res) => {
  await permohonanHaiwanService.deletePermohonanHaiwanById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

const getByPermohonanId = catchAsync(async (req, res) => {
  const result = await permohonanHaiwanService.getByPermohonanId(parseInt(req.params.permohonanId));
  res.send(result);
});

const getByJenisHaiwan = catchAsync(async (req, res) => {
  const result = await permohonanHaiwanService.getByJenisHaiwan(req.params.jenisHaiwan);
  res.send(result);
});

module.exports = {
  createPermohonanHaiwan,
  getPermohonanHaiwan,
  getPermohonanHaiwanById,
  updatePermohonanHaiwan,
  deletePermohonanHaiwan,
  getByPermohonanId,
  getByJenisHaiwan,
};