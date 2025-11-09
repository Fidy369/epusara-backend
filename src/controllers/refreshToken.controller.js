const httpStatus = require('http-status').default;
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { refreshTokenService } = require('../services');

const createRefreshToken = catchAsync(async (req, res) => {
  const token = await refreshTokenService.createRefreshToken(req.body);
  res.status(httpStatus.CREATED).send(token);
});

const queryRefreshTokens = catchAsync(async (req, res) => {
  const filter = {};
  const options = {
    sortBy: req.query.sortBy,
    limit: req.query.limit,
    page: req.query.page,
  };

  if (req.query.user_id) filter.user_id = parseInt(req.query.user_id);
  if (req.query.is_revoked !== undefined) filter.is_revoked = req.query.is_revoked === 'true';

  const result = await refreshTokenService.queryRefreshTokens(filter, options);
  res.send(result);
});

const getRefreshToken = catchAsync(async (req, res) => {
  const token = await refreshTokenService.getRefreshTokenById(parseInt(req.params.tokenId));
  if (!token) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Refresh token not found');
  }
  res.send(token);
});

const getRefreshTokensByUser = catchAsync(async (req, res) => {
  const tokens = await refreshTokenService.getRefreshTokensByUser(parseInt(req.params.userId));
  res.send(tokens);
});

const revokeRefreshToken = catchAsync(async (req, res) => {
  const token = await refreshTokenService.revokeRefreshToken(parseInt(req.params.tokenId));
  res.send(token);
});

const deleteRefreshToken = catchAsync(async (req, res) => {
  await refreshTokenService.deleteRefreshTokenById(parseInt(req.params.tokenId));
  res.status(httpStatus.NO_CONTENT).send();
});

const deleteExpiredTokens = catchAsync(async (req, res) => {
  const result = await refreshTokenService.deleteExpiredTokens();
  res.send({ deleted_count: result.count });
});

const deleteRefreshTokensByUser = catchAsync(async (req, res) => {
  const result = await refreshTokenService.deleteRefreshTokensByUser(parseInt(req.params.userId));
  res.send({ deleted_count: result.count });
});

const replaceRefreshToken = catchAsync(async (req, res) => {
  const token = await refreshTokenService.replaceRefreshTokenById(parseInt(req.params.tokenId), req.body);
  res.send(token);
});

module.exports = {
  createRefreshToken,
  queryRefreshTokens,
  getRefreshToken,
  getRefreshTokensByUser,
  replaceRefreshToken,
  revokeRefreshToken,
  deleteRefreshToken,
  deleteExpiredTokens,
  deleteRefreshTokensByUser,
};