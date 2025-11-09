const catchAsync = require('../utils/catchAsync');
const { referenceService } = require('../services');

const getBurialStatuses = catchAsync(async (req, res) => {
  const result = await referenceService.getBurialStatuses();
  res.send(result);
});

const getDeceasedCategories = catchAsync(async (req, res) => {
  const result = await referenceService.getDeceasedCategories();
  res.send(result);
});

module.exports = {
  getBurialStatuses,
  getDeceasedCategories,
};