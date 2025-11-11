const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { zonTapakPerkuburanService } = require('../services');

const createZonTapakPerkuburan = catchAsync(async (req, res) => {
  const result = await zonTapakPerkuburanService.createZonTapakPerkuburan(req.body);
  res.status(201).send(result);
});

const getZonTapakPerkuburans = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['tapak_perkuburan_id', 'nama_zon', 'ref_kategori_jenazah_id']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await zonTapakPerkuburanService.getZonTapakPerkuburans(filter, options);
  res.send(result);
});

const getZonTapakPerkuburan = catchAsync(async (req, res) => {
  const result = await zonTapakPerkuburanService.getZonTapakPerkuburanById(req.params.id);
  if (!result) {
    throw new ApiError(404, 'Zon tapak perkuburan not found');
  }
  res.send(result);
});

const updateZonTapakPerkuburan = catchAsync(async (req, res) => {
  const result = await zonTapakPerkuburanService.updateZonTapakPerkuburanById(req.params.id, req.body);
  res.send(result);
});

const deleteZonTapakPerkuburan = catchAsync(async (req, res) => {
  await zonTapakPerkuburanService.deleteZonTapakPerkuburanById(req.params.id);
  res.status(204).send();
});

module.exports = {
  createZonTapakPerkuburan,
  getZonTapakPerkuburans,
  getZonTapakPerkuburan,
  updateZonTapakPerkuburan,
  deleteZonTapakPerkuburan,
};