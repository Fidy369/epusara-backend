const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { emailQueueService } = require('../services');

const createEmailQueue = catchAsync(async (req, res) => {
  const emailQueue = await emailQueueService.createEmailQueue(req.body);
  res.status(httpStatus.CREATED).send(emailQueue);
});

const getEmailQueues = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['recipient', 'status', 'subject']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'sortType']);
  const result = await emailQueueService.getEmailQueues(filter, options);
  res.send(result);
});

const getEmailQueue = catchAsync(async (req, res) => {
  const emailQueue = await emailQueueService.getEmailQueueById(req.params.emailQueueId);
  if (!emailQueue) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Email queue not found');
  }
  res.send(emailQueue);
});

const updateEmailQueue = catchAsync(async (req, res) => {
  const emailQueue = await emailQueueService.updateEmailQueueById(req.params.emailQueueId, req.body);
  res.send(emailQueue);
});

const deleteEmailQueue = catchAsync(async (req, res) => {
  const emailQueue = await emailQueueService.getEmailQueueById(req.params.emailQueueId);
  if (!emailQueue) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Email queue not found');
  }
  await emailQueueService.deleteEmailQueueById(req.params.emailQueueId);
  res.status(204).send();
});

const getEmailQueuesByStatus = catchAsync(async (req, res) => {
  const result = await emailQueueService.getEmailQueuesByStatus(req.params.status);
  res.send(result);
});

const updateEmailQueueStatus = catchAsync(async (req, res) => {
  const { status, sentAt, lastError } = req.body;
  const emailQueue = await emailQueueService.updateEmailQueueStatus(req.params.emailQueueId, status, sentAt, lastError);
  res.send(emailQueue);
});

const incrementAttempts = catchAsync(async (req, res) => {
  const emailQueue = await emailQueueService.incrementAttempts(req.params.emailQueueId);
  res.send(emailQueue);
});

const replaceEmailQueue = catchAsync(async (req, res) => {
  const emailQueue = await emailQueueService.replaceEmailQueue(req.params.emailQueueId, req.body);
  res.send(emailQueue);
});

module.exports = {
  createEmailQueue,
  getEmailQueues,
  getEmailQueue,
  updateEmailQueue,
  deleteEmailQueue,
  getEmailQueuesByStatus,
  updateEmailQueueStatus,
  incrementAttempts,
  replaceEmailQueue,
};