const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { auditLogService } = require('../services');

const createAuditLog = catchAsync(async (req, res) => {
  const result = await auditLogService.createAuditLog(req.body);
  res.status(httpStatus.CREATED).send(result);
});

const getAuditLogs = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['event_id', 'object_type', 'object_id']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'sortType']);
  const result = await auditLogService.getAuditLogs(filter, options);
  res.send(result);
});

const getAuditLogById = catchAsync(async (req, res) => {
  const result = await auditLogService.getAuditLogById(req.params.id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Audit log not found');
  }
  res.send(result);
});

const updateAuditLog = catchAsync(async (req, res) => {
  const result = await auditLogService.updateAuditLogById(req.params.id, req.body);
  res.send(result);
});

const deleteAuditLog = catchAsync(async (req, res) => {
  const auditLog = await auditLogService.getAuditLogById(req.params.id);
  if (!auditLog) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Audit log not found');
  }
  await auditLogService.deleteAuditLogById(req.params.id);
  res.status(204).send();
});

const getByEventId = catchAsync(async (req, res) => {
  const result = await auditLogService.getByEventId(parseInt(req.params.eventId));
  res.send(result);
});

const getByObjectType = catchAsync(async (req, res) => {
  const result = await auditLogService.getByObjectType(req.params.objectType);
  res.send(result);
});

module.exports = {
  createAuditLog,
  getAuditLogs,
  getAuditLogById,
  updateAuditLog,
  deleteAuditLog,
  getByEventId,
  getByObjectType,
};