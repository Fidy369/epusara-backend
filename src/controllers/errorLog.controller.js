const httpStatus = require('http-status').default;
const catchAsync = require('../utils/catchAsync');
const { errorLogService } = require('../services');

const createErrorLog = catchAsync(async (req, res) => {
  const errorLog = await errorLogService.createErrorLog(req.body);
  res.status(httpStatus.CREATED).send(errorLog);
});

const queryErrorLogs = catchAsync(async (req, res) => {
  const filter = {};
  const options = {
    sortBy: req.query.sortBy,
    limit: req.query.limit,
    page: req.query.page,
  };

  if (req.query.type) filter.type = req.query.type;
  if (req.query.user_id) filter.user_id = parseInt(req.query.user_id);
  if (req.query.dateFrom) filter.created_at = { gte: new Date(req.query.dateFrom) };
  if (req.query.dateTo) {
    filter.created_at = { ...filter.created_at, lte: new Date(req.query.dateTo) };
  }

  const result = await errorLogService.queryErrorLogs(filter, options);
  res.send(result);
});

const getErrorLog = catchAsync(async (req, res) => {
  const errorLog = await errorLogService.getErrorLogById(parseInt(req.params.errorId));
  if (!errorLog) {
    const ApiError = require('../utils/ApiError');
    throw new ApiError(httpStatus.NOT_FOUND, 'Error log not found');
  }
  res.send(errorLog);
});

const deleteErrorLog = catchAsync(async (req, res) => {
  const errorLog = await errorLogService.getErrorLogById(parseInt(req.params.errorId));
  if (!errorLog) {
    const ApiError = require('../utils/ApiError');
    throw new ApiError(httpStatus.NOT_FOUND, 'Error log not found');
  }
  await errorLogService.deleteErrorLogById(parseInt(req.params.errorId));
  res.status(204).send();
});

const clearOldErrorLogs = catchAsync(async (req, res) => {
  const days = parseInt(req.query.days) || 30;
  const result = await errorLogService.clearOldErrorLogs(days);
  res.send({ deleted_count: result.count });
});

const getErrorStatistics = catchAsync(async (req, res) => {
  const hours = parseInt(req.query.hours) || 24;
  const stats = await errorLogService.getErrorStatistics(hours);
  res.send(stats);
});

module.exports = {
  createErrorLog,
  queryErrorLogs,
  getErrorLog,
  deleteErrorLog,
  clearOldErrorLogs,
  getErrorStatistics,
};