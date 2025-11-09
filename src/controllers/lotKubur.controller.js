const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { lotKuburService } = require('../services');

const createLotKubur = catchAsync(async (req, res) => {
  const result = await lotKuburService.createLotKubur(req.body);
  res.status(201).send(result);
});

const getLotKuburs = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['tapak_perkuburan_id', 'zon_id', 'kod_kategori_jenazah', 'kod_status_kubur', 'no_lot']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await lotKuburService.getLotKuburs(filter, options);
  res.send(result);
});

const getLotKubur = catchAsync(async (req, res) => {
  const result = await lotKuburService.getLotKuburById(req.params.id);
  if (!result) {
    throw new ApiError(404, 'Lot kubur not found');
  }
  res.send(result);
});

const updateLotKubur = catchAsync(async (req, res) => {
  const result = await lotKuburService.updateLotKuburById(req.params.id, req.body);
  res.send(result);
});

const deleteLotKubur = catchAsync(async (req, res) => {
  await lotKuburService.deleteLotKuburById(req.params.id);
  res.status(204).send();
});

const replaceLotKubur = catchAsync(async (req, res) => {
  const result = await lotKuburService.replaceLotKuburById(req.params.id, req.body);
  res.send(result);
});

module.exports = {
  createLotKubur,
  getLotKuburs,
  getLotKubur,
  updateLotKubur,
  replaceLotKubur,
  deleteLotKubur,
};