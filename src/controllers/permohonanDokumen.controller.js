const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { permohonanDokumenService } = require('../services');

const createPermohonanDokumen = catchAsync(async (req, res) => {
  const result = await permohonanDokumenService.createPermohonanDokumen(req.body);
  res.status(httpStatus.CREATED).send(result);
});

const getPermohonanDokumen = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['permohonan_id', 'jenis_dokumen', 'attachment_id']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'sortType']);
  const result = await permohonanDokumenService.getPermohonanDokumen(filter, options);
  res.send(result);
});

const getPermohonanDokumenById = catchAsync(async (req, res) => {
  const result = await permohonanDokumenService.getPermohonanDokumenById(req.params.id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Permohonan dokumen not found');
  }
  res.send(result);
});

const updatePermohonanDokumen = catchAsync(async (req, res) => {
  const result = await permohonanDokumenService.updatePermohonanDokumenById(req.params.id, req.body);
  res.send(result);
});

const deletePermohonanDokumen = catchAsync(async (req, res) => {
  await permohonanDokumenService.deletePermohonanDokumenById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

const getByPermohonanId = catchAsync(async (req, res) => {
  const result = await permohonanDokumenService.getByPermohonanId(parseInt(req.params.permohonanId));
  res.send(result);
});

const getByJenisDokumen = catchAsync(async (req, res) => {
  const result = await permohonanDokumenService.getByJenisDokumen(req.params.jenisDokumen);
  res.send(result);
});

module.exports = {
  createPermohonanDokumen,
  getPermohonanDokumen,
  getPermohonanDokumenById,
  updatePermohonanDokumen,
  deletePermohonanDokumen,
  getByPermohonanId,
  getByJenisDokumen,
};