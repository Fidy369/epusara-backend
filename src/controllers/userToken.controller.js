const httpStatus = require('http-status').default;
const catchAsync = require('../utils/catchAsync');
const { userTokenService } = require('../services');

const createUserToken = catchAsync(async (req, res) => {
  const token = await userTokenService.createUserToken(req.body);
  res.status(httpStatus.CREATED).send(token);
});

const queryUserTokens = catchAsync(async (req, res) => {
  const filter = {};
  const options = {
    sortBy: req.query.sortBy,
    limit: req.query.limit,
    page: req.query.page,
  };

  if (req.query.user_id) filter.user_id = parseInt(req.query.user_id);
  if (req.query.selector) filter.selector = req.query.selector;

  const result = await userTokenService.queryUserTokens(filter, options);
  res.send(result);
});

const getUserToken = catchAsync(async (req, res) => {
  const token = await userTokenService.getUserTokenById(parseInt(req.params.tokenId));
  if (!token) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User token not found');
  }
  res.send(token);
});

const getUserTokenBySelector = catchAsync(async (req, res) => {
  const token = await userTokenService.getUserTokenBySelector(req.params.selector);
  if (!token) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User token not found');
  }
  res.send(token);
});

const getUserTokensByUser = catchAsync(async (req, res) => {
  const tokens = await userTokenService.getUserTokensByUser(parseInt(req.params.userId));
  res.send(tokens);
});

const updateUserToken = catchAsync(async (req, res) => {
  const token = await userTokenService.updateUserTokenById(parseInt(req.params.tokenId), req.body);
  res.send(token);
});

const deleteUserToken = catchAsync(async (req, res) => {
  await userTokenService.deleteUserTokenById(parseInt(req.params.tokenId));
  res.status(httpStatus.NO_CONTENT).send();
});

const deleteExpiredTokens = catchAsync(async (req, res) => {
  const result = await userTokenService.deleteExpiredTokens();
  res.send({ deleted_count: result.count });
});

const deleteUserTokensByUser = catchAsync(async (req, res) => {
  const result = await userTokenService.deleteUserTokensByUser(parseInt(req.params.userId));
  res.send({ deleted_count: result.count });
});

const replaceUserToken = catchAsync(async (req, res) => {
  const token = await userTokenService.replaceUserTokenById(parseInt(req.params.tokenId), req.body);
  res.send(token);
});

module.exports = {
  createUserToken,
  queryUserTokens,
  getUserToken,
  getUserTokenBySelector,
  getUserTokensByUser,
  replaceUserToken,
  updateUserToken,
  deleteUserToken,
  deleteExpiredTokens,
  deleteUserTokensByUser,
};