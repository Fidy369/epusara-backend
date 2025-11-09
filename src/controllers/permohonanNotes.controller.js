const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { permohonanNotesService } = require('../services');

const createPermohonanNotes = catchAsync(async (req, res) => {
  const result = await permohonanNotesService.createPermohonanNotes(req.body);
  res.status(httpStatus.CREATED).send(result);
});

const getPermohonanNotes = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['permohonan_id', 'type']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'sortType']);
  const result = await permohonanNotesService.getPermohonanNotes(filter, options);
  res.send(result);
});

const getPermohonanNotesById = catchAsync(async (req, res) => {
  const result = await permohonanNotesService.getPermohonanNotesById(req.params.id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Permohonan notes not found');
  }
  res.send(result);
});

const updatePermohonanNotes = catchAsync(async (req, res) => {
  const result = await permohonanNotesService.updatePermohonanNotesById(req.params.id, req.body);
  res.send(result);
});

const deletePermohonanNotes = catchAsync(async (req, res) => {
  await permohonanNotesService.deletePermohonanNotesById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

const getByPermohonanId = catchAsync(async (req, res) => {
  const result = await permohonanNotesService.getByPermohonanId(parseInt(req.params.permohonanId));
  res.send(result);
});

const getByType = catchAsync(async (req, res) => {
  const result = await permohonanNotesService.getByType(req.params.type);
  res.send(result);
});

const replacePermohonanNotes = catchAsync(async (req, res) => {
  const result = await permohonanNotesService.replacePermohonanNotesById(req.params.id, req.body);
  res.send(result);
});

module.exports = {
  createPermohonanNotes,
  getPermohonanNotes,
  getPermohonanNotesById,
  replacePermohonanNotes,
  updatePermohonanNotes,
  deletePermohonanNotes,
  getByPermohonanId,
  getByType,
};