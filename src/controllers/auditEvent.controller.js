const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { auditEventService } = require('../services');

const createAuditEvent = catchAsync(async (req, res) => {
  const result = await auditEventService.createAuditEvent(req.body);
  res.status(httpStatus.CREATED).send(result);
});

const getAuditEvents = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['user_id', 'event', 'ip_address']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'sortType']);
  const result = await auditEventService.getAuditEvents(filter, options);
  res.send(result);
});

const getAuditEventById = catchAsync(async (req, res) => {
  const result = await auditEventService.getAuditEventById(req.params.id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Audit event not found');
  }
  res.send(result);
});

const updateAuditEvent = catchAsync(async (req, res) => {
  const result = await auditEventService.updateAuditEventById(req.params.id, req.body);
  res.send(result);
});

const deleteAuditEvent = catchAsync(async (req, res) => {
  await auditEventService.deleteAuditEventById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

const getByUserId = catchAsync(async (req, res) => {
  const result = await auditEventService.getByUserId(parseInt(req.params.userId));
  res.send(result);
});

const getByEvent = catchAsync(async (req, res) => {
  const result = await auditEventService.getByEvent(req.params.event);
  res.send(result);
});

module.exports = {
  createAuditEvent,
  getAuditEvents,
  getAuditEventById,
  updateAuditEvent,
  deleteAuditEvent,
  getByUserId,
  getByEvent,
};