const httpStatus = require('http-status').default;
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const { passwordHistoryService } = require('../services');

const createPasswordHistory = catchAsync(async (req, res) => {
  const history = await passwordHistoryService.createPasswordHistory(req.body);
  res.status(httpStatus.CREATED).send(history);
});

const queryPasswordHistory = catchAsync(async (req, res) => {
  const filter = {};
  const options = {
    sortBy: req.query.sortBy,
    limit: req.query.limit,
    page: req.query.page,
  };

  if (req.query.user_id) filter.user_id = parseInt(req.query.user_id);

  const result = await passwordHistoryService.queryPasswordHistory(filter, options);
  res.send(result);
});

const getPasswordHistory = catchAsync(async (req, res) => {
  const history = await passwordHistoryService.getPasswordHistoryById(parseInt(req.params.historyId));
  if (!history) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Password history not found');
  }
  res.send(history);
});

const getPasswordHistoryByUser = catchAsync(async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const history = await passwordHistoryService.getPasswordHistoryByUser(parseInt(req.params.userId), limit);
  res.send(history);
});

const deletePasswordHistory = catchAsync(async (req, res) => {
  await passwordHistoryService.deletePasswordHistoryById(parseInt(req.params.historyId));
  res.status(httpStatus.NO_CONTENT).send();
});

const cleanExpiredHistory = catchAsync(async (req, res) => {
  const result = await passwordHistoryService.cleanExpiredHistory();
  res.send({ deleted_count: result.count });
});

const updatePasswordHistory = catchAsync(async (req, res) => {
  const history = await passwordHistoryService.updatePasswordHistoryById(
    parseInt(req.params.historyId),
    req.body
  );
  res.send(history);
});

module.exports = {
  createPasswordHistory,
  queryPasswordHistory,
  getPasswordHistory,
  getPasswordHistoryByUser,
  updatePasswordHistory,
  deletePasswordHistory,
  cleanExpiredHistory,
};