const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { permohonanService } = require('../services');

const createPermohonan = catchAsync(async (req, res) => {
  const permohonan = await permohonanService.createPermohonan(req.body);
  res.status(201).send(permohonan);
});

const getPermohonans = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['status_permohonan', 'kod_jenis_permohonan', 'no_permohonan']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await permohonanService.queryPermohonans(filter, options);
  res.send(result);
});

const getPermohonan = catchAsync(async (req, res) => {
  const permohonan = await permohonanService.getPermohonanById(parseInt(req.params.permohonanId));
  if (!permohonan) {
    throw new ApiError(404, 'Permohonan not found');
  }
  res.send(permohonan);
});

const updatePermohonan = catchAsync(async (req, res) => {
  const permohonan = await permohonanService.updatePermohonanById(parseInt(req.params.permohonanId), req.body);
  res.send(permohonan);
});

const submitPermohonan = catchAsync(async (req, res) => {
  const permohonan = await permohonanService.submitPermohonan(parseInt(req.params.permohonanId));
  res.send(permohonan);
});

const approvePermohonan = catchAsync(async (req, res) => {
  const permohonan = await permohonanService.approvePermohonan(
    parseInt(req.params.permohonanId), 
    req.body.notes
  );
  res.send(permohonan);
});

const rejectPermohonan = catchAsync(async (req, res) => {
  const permohonan = await permohonanService.rejectPermohonan(
    parseInt(req.params.permohonanId), 
    req.body.notes
  );
  res.send(permohonan);
});

const deletePermohonan = catchAsync(async (req, res) => {
  await permohonanService.deletePermohonanById(parseInt(req.params.permohonanId));
  res.status(204).send();
});

module.exports = {
  createPermohonan,
  getPermohonans,
  getPermohonan,
  updatePermohonan,
  submitPermohonan,
  approvePermohonan,
  rejectPermohonan,
  deletePermohonan,
};