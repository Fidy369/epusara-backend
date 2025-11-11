const httpStatus = require('http-status').default;
const catchAsync = require('../utils/catchAsync');
const { userProfileService } = require('../services');

const createUserProfile = catchAsync(async (req, res) => {
  const profile = await userProfileService.createUserProfile(req.body);
  res.status(httpStatus.CREATED).send(profile);
});

const queryUserProfiles = catchAsync(async (req, res) => {
  const filter = {};
  const options = {
    sortBy: req.query.sortBy,
    limit: req.query.limit,
    page: req.query.page,
  };

  if (req.query.user_id) filter.user_id = parseInt(req.query.user_id);
  if (req.query.gender) filter.gender = req.query.gender;
  if (req.query.jenis_pengenalan) filter.jenis_pengenalan = req.query.jenis_pengenalan;

  const result = await userProfileService.queryUserProfiles(filter, options);
  res.send(result);
});

const getUserProfile = catchAsync(async (req, res) => {
  const profile = await userProfileService.getUserProfileById(parseInt(req.params.profileId));
  if (!profile) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User profile not found');
  }
  res.send(profile);
});

const getUserProfileByUserId = catchAsync(async (req, res) => {
  const profile = await userProfileService.getUserProfileByUserId(parseInt(req.params.userId));
  if (!profile) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User profile not found');
  }
  res.send(profile);
});

const updateUserProfile = catchAsync(async (req, res) => {
  const profile = await userProfileService.updateUserProfileById(parseInt(req.params.profileId), req.body);
  res.send(profile);
});

const deleteUserProfile = catchAsync(async (req, res) => {
  await userProfileService.deleteUserProfileById(parseInt(req.params.profileId));
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createUserProfile,
  queryUserProfiles,
  getUserProfile,
  getUserProfileByUserId,
  updateUserProfile,
  deleteUserProfile,
};