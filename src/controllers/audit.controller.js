const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { auditService } = require('../services');
const ApiError = require('../utils/ApiError');

const queryAuditEvents = catchAsync(async (req, res) => {
  const filter = {};
  const options = {
    sortBy: req.query.sortBy,
    limit: req.query.limit,
    page: req.query.page,
  };

  if (req.query.user_id) filter.user_id = parseInt(req.query.user_id);
  if (req.query.event) filter.event = req.query.event;
  if (req.query.ip_address) filter.ip_address = req.query.ip_address;

  const result = await auditService.queryAuditEvents(filter, options);
  res.send(result);
});

const getAuditTrail = catchAsync(async (req, res) => {
  const { objectType, objectId } = req.params;
  const auditTrail = await auditService.getAuditTrail(objectType, objectId);
  res.send(auditTrail);
});

const getAuditEventById = catchAsync(async (req, res) => {
  const result = await auditService.getAuditEventById(parseInt(req.params.id));
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Audit event not found');
  }
  res.send(result);
});

const updateAuditEvent = catchAsync(async (req, res) => {
  const result = await auditService.updateAuditEvent(parseInt(req.params.id), req.body);
  res.send(result);
});

const replaceAuditEvent = catchAsync(async (req, res) => {
  const result = await auditService.replaceAuditEvent(parseInt(req.params.id), req.body);
  res.send(result);
});

const deleteAuditEvent = catchAsync(async (req, res) => {
  await auditService.deleteAuditEvent(parseInt(req.params.id));
  res.status(httpStatus.NO_CONTENT).send();
});

const getAuditLogById = catchAsync(async (req, res) => {
  const result = await auditService.getAuditLogById(parseInt(req.params.id));
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Audit log not found');
  }
  res.send(result);
});

const updateAuditLog = catchAsync(async (req, res) => {
  const result = await auditService.updateAuditLog(parseInt(req.params.id), req.body);
  res.send(result);
});

const replaceAuditLog = catchAsync(async (req, res) => {
  const result = await auditService.replaceAuditLog(parseInt(req.params.id), req.body);
  res.send(result);
});

const deleteAuditLog = catchAsync(async (req, res) => {
  await auditService.deleteAuditLog(parseInt(req.params.id));
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  queryAuditEvents,
  getAuditTrail,
  getAuditEventById,
  updateAuditEvent,
  replaceAuditEvent,
  deleteAuditEvent,
  getAuditLogById,
  updateAuditLog,
  replaceAuditLog,
  deleteAuditLog,
};