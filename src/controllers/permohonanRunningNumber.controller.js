const httpStatus = require('http-status').default;
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { permohonanRunningNumberService } = require('../services');

const createRunningNumber = catchAsync(async (req, res) => {
  const runningNumber = await permohonanRunningNumberService.createRunningNumber(req.body);
  res.status(httpStatus.CREATED).send(runningNumber);
});

const queryRunningNumbers = catchAsync(async (req, res) => {
  const filter = {};
  const options = {
    sortBy: req.query.sortBy,
    limit: req.query.limit,
    page: req.query.page,
  };

  if (req.query.type) filter.type = req.query.type;
  if (req.query.date) filter.date = new Date(req.query.date);

  const result = await permohonanRunningNumberService.queryRunningNumbers(filter, options);
  res.send(result);
});

const getRunningNumber = catchAsync(async (req, res) => {
  const runningNumber = await permohonanRunningNumberService.getRunningNumberById(parseInt(req.params.runningNumberId));
  if (!runningNumber) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Running number not found');
  }
  res.send(runningNumber);
});

const getNextRunningNumber = catchAsync(async (req, res) => {
  const { type } = req.params;
  const date = req.query.date ? new Date(req.query.date) : new Date();
  const nextNumber = await permohonanRunningNumberService.getNextRunningNumber(type, date);
  res.send({ type, date, running_no: nextNumber });
});

const incrementRunningNumber = catchAsync(async (req, res) => {
  const runningNumber = await permohonanRunningNumberService.incrementRunningNumber(parseInt(req.params.runningNumberId));
  res.send(runningNumber);
});

const resetRunningNumber = catchAsync(async (req, res) => {
  const { newNumber } = req.body;
  const runningNumber = await permohonanRunningNumberService.resetRunningNumber(parseInt(req.params.runningNumberId), newNumber);
  res.send(runningNumber);
});

const deleteRunningNumber = catchAsync(async (req, res) => {
  await permohonanRunningNumberService.deleteRunningNumberById(parseInt(req.params.runningNumberId));
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createRunningNumber,
  queryRunningNumbers,
  getRunningNumber,
  getNextRunningNumber,
  incrementRunningNumber,
  resetRunningNumber,
  deleteRunningNumber,
};