const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { tapakPerkuburanService } = require('../services');

const createTapakPerkuburan = catchAsync(async (req, res) => {
  const result = await tapakPerkuburanService.createTapakPerkuburan(req.body);
  res.status(201).send(result);
});

const getTapakPerkuburans = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['nama_tapak', 'lokasi_tapak']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await tapakPerkuburanService.getTapakPerkuburans(filter, options);
  res.send(result);
});

const getTapakPerkuburan = catchAsync(async (req, res) => {
  const result = await tapakPerkuburanService.getTapakPerkuburanById(req.params.id);
  if (!result) {
    throw new ApiError(404, 'Tapak perkuburan not found');
  }
  res.send(result);
});

const updateTapakPerkuburan = catchAsync(async (req, res) => {
  const result = await tapakPerkuburanService.updateTapakPerkuburanById(req.params.id, req.body);
  res.send(result);
});

const deleteTapakPerkuburan = catchAsync(async (req, res) => {
  await tapakPerkuburanService.deleteTapakPerkuburanById(req.params.id);
  res.status(204).send();
});

const replaceTapakPerkuburan = catchAsync(async (req, res) => {
  const result = await tapakPerkuburanService.replaceTapakPerkuburanById(req.params.id, req.body);
  res.send(result);
});

module.exports = {
  createTapakPerkuburan,
  getTapakPerkuburans,
  replaceTapakPerkuburan,
  getTapakPerkuburan,
  updateTapakPerkuburan,
  deleteTapakPerkuburan,
};