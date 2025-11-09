const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { permohonanBayaranService } = require('../services');

const createPermohonanBayaran = catchAsync(async (req, res) => {
  const result = await permohonanBayaranService.createPermohonanBayaran(req.body);
  res.status(httpStatus.CREATED).send(result);
});

const getPermohonanBayaran = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['permohonan_id', 'status_bayaran', 'no_akaun', 'no_resit']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'sortType']);
  const result = await permohonanBayaranService.getPermohonanBayaran(filter, options);
  res.send(result);
});

const getPermohonanBayaranById = catchAsync(async (req, res) => {
  const result = await permohonanBayaranService.getPermohonanBayaranById(req.params.id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Permohonan bayaran not found');
  }
  res.send(result);
});

const updatePermohonanBayaran = catchAsync(async (req, res) => {
  const result = await permohonanBayaranService.updatePermohonanBayaranById(req.params.id, req.body);
  res.send(result);
});

const deletePermohonanBayaran = catchAsync(async (req, res) => {
  await permohonanBayaranService.deletePermohonanBayaranById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

const getByPermohonanId = catchAsync(async (req, res) => {
  const result = await permohonanBayaranService.getByPermohonanId(parseInt(req.params.permohonanId));
  res.send(result);
});

const getByStatus = catchAsync(async (req, res) => {
  const result = await permohonanBayaranService.getByStatus(req.params.status);
  res.send(result);
});

const replacePermohonanBayaran = catchAsync(async (req, res) => {
  const result = await permohonanBayaranService.replacePermohonanBayaranById(req.params.id, req.body);
  res.send(result);
});

module.exports = {
  createPermohonanBayaran,
  getPermohonanBayaran,
  getPermohonanBayaranById,
  replacePermohonanBayaran,
  updatePermohonanBayaran,
  deletePermohonanBayaran,
  getByPermohonanId,
  getByStatus,
};