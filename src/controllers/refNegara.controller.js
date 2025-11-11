const httpStatus = require('http-status').default;
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { refNegaraService } = require('../services');

const createRefNegara = catchAsync(async (req, res) => {
  const result = await refNegaraService.createRefNegara(req.body);
  res.status(201).send(result);
});

const getRefNegaras = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['kod_negara', 'label_ms', 'label_en', 'is_active']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await refNegaraService.getRefNegaras(filter, options);
  res.send(result);
});

const getRefNegara = catchAsync(async (req, res) => {
  const result = await refNegaraService.getRefNegaraByKod(req.params.kod);
  if (!result) {
    throw new ApiError(404, 'Reference negara not found');
  }
  res.send(result);
});

const getActiveCountries = catchAsync(async (req, res) => {
  const countries = await refNegaraService.getActiveCountries();
  res.send(countries);
});

const updateRefNegara = catchAsync(async (req, res) => {
  const result = await refNegaraService.updateRefNegaraByKod(req.params.kod, req.body);
  res.send(result);
});

const deleteRefNegara = catchAsync(async (req, res) => {
  await refNegaraService.deleteRefNegaraByKod(req.params.kod);
  res.status(204).send();
});

module.exports = {
  createRefNegara,
  getRefNegaras,
  getRefNegara,
  updateRefNegara,
  deleteRefNegara,
};