const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userTapakPerkuburanService } = require('../services');

const assignUserToSite = catchAsync(async (req, res) => {
  const result = await userTapakPerkuburanService.assignUserToSite(req.body);
  res.status(201).send(result);
});

const getUserSiteAssignments = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['user_id', 'tapak_perkuburan_id']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userTapakPerkuburanService.getUserSiteAssignments(filter, options);
  res.send(result);
});

const getUserSiteAssignment = catchAsync(async (req, res) => {
  const result = await userTapakPerkuburanService.getUserSiteAssignmentById(req.params.userId, req.params.siteId);
  if (!result) {
    throw new ApiError(404, 'User site assignment not found');
  }
  res.send(result);
});

const removeUserFromSite = catchAsync(async (req, res) => {
  await userTapakPerkuburanService.removeUserFromSite(req.params.userId, req.params.siteId);
  res.status(204).send();
});

// NEW: Update controller
const updateUserSiteAssignment = catchAsync(async (req, res) => {
  const result = await userTapakPerkuburanService.updateUserSiteAssignment(
    req.params.userId,
    req.params.siteId,
    req.body
  );
  res.send(result);
});

module.exports = {
  assignUserToSite,
  getUserSiteAssignments,
  updateUserSiteAssignment,
  getUserSiteAssignment,
  removeUserFromSite,
};