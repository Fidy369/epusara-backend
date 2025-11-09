const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { refPaparanPengumumanService } = require('../services');

const createRefPaparanPengumuman = catchAsync(async (req, res) => {
  const result = await refPaparanPengumumanService.createRefPaparanPengumuman(req.body);
  res.status(201).send(result);
});

const getRefPaparanPengumumans = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['content_ms', 'content_en', 'is_active']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await refPaparanPengumumanService.getRefPaparanPengumumans(filter, options);
  res.send(result);
});

const getRefPaparanPengumuman = catchAsync(async (req, res) => {
  const result = await refPaparanPengumumanService.getRefPaparanPengumumanById(req.params.id);
  if (!result) {
    throw new ApiError(404, 'Reference paparan pengumuman not found');
  }
  res.send(result);
});

const updateRefPaparanPengumuman = catchAsync(async (req, res) => {
  const result = await refPaparanPengumumanService.updateRefPaparanPengumumanById(req.params.id, req.body);
  res.send(result);
});

const deleteRefPaparanPengumuman = catchAsync(async (req, res) => {
  await refPaparanPengumumanService.deleteRefPaparanPengumumanById(req.params.id);
  res.status(204).send();
});

const replaceRefPaparanPengumuman = catchAsync(async (req, res) => {
  const result = await refPaparanPengumumanService.replaceRefPaparanPengumumanById(req.params.id, req.body);
  res.send(result);
});

module.exports = {
  createRefPaparanPengumuman,
  getRefPaparanPengumumans,
  replaceRefPaparanPengumuman,
  getRefPaparanPengumuman,
  updateRefPaparanPengumuman,
  deleteRefPaparanPengumuman,
};