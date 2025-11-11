const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { refStatusKuburService } = require('../services');

const createRefStatusKubur = catchAsync(async (req, res) => {
  const result = await refStatusKuburService.createRefStatusKubur(req.body);
  res.status(201).send(result);
});

const getRefStatusKuburs = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['kod_status_kubur', 'label_ms', 'label_en', 'is_active']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await refStatusKuburService.getRefStatusKuburs(filter, options);
  res.send(result);
});

const getRefStatusKubur = catchAsync(async (req, res) => {
  const result = await refStatusKuburService.getRefStatusKuburByKod(req.params.kod);
  if (!result) {
    throw new ApiError(404, 'Reference status kubur not found');
  }
  res.send(result);
});

const updateRefStatusKubur = catchAsync(async (req, res) => {
  const result = await refStatusKuburService.updateRefStatusKuburByKod(req.params.kod, req.body);
  res.send(result);
});

const deleteRefStatusKubur = catchAsync(async (req, res) => {
  await refStatusKuburService.deleteRefStatusKuburByKod(req.params.kod);
  res.status(204).send();
});

module.exports = {
  createRefStatusKubur,
  getRefStatusKuburs,
  getRefStatusKubur,
  updateRefStatusKubur,
  deleteRefStatusKubur,
};