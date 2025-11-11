const httpStatus = require('http-status').default;
const catchAsync = require('../utils/catchAsync');
const { passwordResetService } = require('../services');

const createPasswordReset = catchAsync(async (req, res) => {
  const reset = await passwordResetService.createPasswordReset(req.body);
  res.status(httpStatus.CREATED).send(reset);
});

const queryPasswordResets = catchAsync(async (req, res) => {
  const filter = {};
  const options = {
    sortBy: req.query.sortBy,
    limit: req.query.limit,
    page: req.query.page,
  };

  if (req.query.user_id) filter.user_id = parseInt(req.query.user_id);

  const result = await passwordResetService.queryPasswordResets(filter, options);
  res.send(result);
});

const getPasswordReset = catchAsync(async (req, res) => {
  const reset = await passwordResetService.getPasswordResetById(parseInt(req.params.resetId));
  if (!reset) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Password reset not found');
  }
  res.send(reset);
});

const getPasswordResetByUser = catchAsync(async (req, res) => {
  const reset = await passwordResetService.getPasswordResetByUser(parseInt(req.params.userId));
  if (!reset) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Password reset not found');
  }
  res.send(reset);
});

const deletePasswordReset = catchAsync(async (req, res) => {
  await passwordResetService.deletePasswordResetById(parseInt(req.params.resetId));
  res.status(httpStatus.NO_CONTENT).send();
});

const deletePasswordResetsByUser = catchAsync(async (req, res) => {
  const result = await passwordResetService.deletePasswordResetsByUser(parseInt(req.params.userId));
  res.send({ deleted_count: result.count });
});

module.exports = {
  createPasswordReset,
  queryPasswordResets,
  getPasswordReset,
  getPasswordResetByUser,
  deletePasswordReset,
  deletePasswordResetsByUser,
};