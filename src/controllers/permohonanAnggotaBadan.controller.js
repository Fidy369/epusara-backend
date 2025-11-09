const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { permohonanAnggotaBadanService } = require('../services');

const createPermohonanAnggotaBadan = catchAsync(async (req, res) => {
  const result = await permohonanAnggotaBadanService.createPermohonanAnggotaBadan(req.body);
  res.status(httpStatus.CREATED).send(result);
});

const getPermohonanAnggotaBadan = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['permohonan_id', 'ref_bahagian_badan_kod']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'sortType']);
  const result = await permohonanAnggotaBadanService.getPermohonanAnggotaBadan(filter, options);
  res.send(result);
});

const getPermohonanAnggotaBadanById = catchAsync(async (req, res) => {
  const result = await permohonanAnggotaBadanService.getPermohonanAnggotaBadanById(req.params.id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Permohonan anggota badan not found');
  }
  res.send(result);
});

const updatePermohonanAnggotaBadan = catchAsync(async (req, res) => {
  const result = await permohonanAnggotaBadanService.updatePermohonanAnggotaBadanById(req.params.id, req.body);
  res.send(result);
});

// ADD THIS NEW CONTROLLER FOR PUT
const replacePermohonanAnggotaBadan = catchAsync(async (req, res) => {
  const result = await permohonanAnggotaBadanService.replacePermohonanAnggotaBadanById(req.params.id, req.body);
  res.send(result);
});

const deletePermohonanAnggotaBadan = catchAsync(async (req, res) => {
  await permohonanAnggotaBadanService.deletePermohonanAnggotaBadanById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

const getByPermohonanId = catchAsync(async (req, res) => {
  const result = await permohonanAnggotaBadanService.getByPermohonanId(parseInt(req.params.permohonanId));
  res.send(result);
});

const deleteByPermohonanId = catchAsync(async (req, res) => {
  await permohonanAnggotaBadanService.deleteByPermohonanId(parseInt(req.params.permohonanId));
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createPermohonanAnggotaBadan,
  getPermohonanAnggotaBadan,
  getPermohonanAnggotaBadanById,
  updatePermohonanAnggotaBadan,
  replacePermohonanAnggotaBadan, // ADD THIS
  deletePermohonanAnggotaBadan,
  getByPermohonanId,
  deleteByPermohonanId,
};