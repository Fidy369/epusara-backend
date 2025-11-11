const httpStatus = require('http-status').default;
const catchAsync = require('../utils/catchAsync');
const { auditService } = require('../services');

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

module.exports = {
  queryAuditEvents,
  getAuditTrail,
};