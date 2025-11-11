const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/**
 * Create audit event
 * @param {Object} eventData
 * @returns {Promise<AuditEvent>}
 */
const createAuditEvent = async (eventData) => {
  return prisma.audit_event.create({
    data: eventData,
    include: {
      audit_log: true
    }
  });
};

/**
 * Create audit log entry
 * @param {number} eventId
 * @param {Object} logData
 * @returns {Promise<AuditLog>}
 */
const createAuditLog = async (eventId, logData) => {
  return prisma.audit_log.create({
    data: {
      event_id: eventId,
      ...logData
    },
    include: {
      audit_event: true
    }
  });
};

/**
 * Log user action
 * @param {number} userId
 * @param {string} ipAddress
 * @param {string} event
 * @param {string} description
 * @param {Array} changes
 * @returns {Promise<AuditEvent>}
 */
const logUserAction = async (userId, ipAddress, event, description, changes = []) => {
  const auditEvent = await createAuditEvent({
    user_id: userId,
    ip_address: ipAddress,
    event,
    description
  });

  // Create audit log entries for each change
  for (const change of changes) {
    await createAuditLog(auditEvent.id, change);
  }

  return auditEvent;
};

/**
 * Query audit events
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<QueryResult>}
 */
const queryAuditEvents = async (filter = {}, options = {}) => {
  const limit = parseInt(options.limit, 10) || 10;
  const page = parseInt(options.page, 10) || 1;
  const sortBy = options.sortBy || 'event_time:desc';
  const [sortField, sortOrder] = sortBy.split(':');

  const [totalResults, results] = await Promise.all([
    prisma.audit_event.count({ where: filter }),
    prisma.audit_event.findMany({
      where: filter,
      orderBy: { [sortField]: sortOrder },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        audit_log: true
      }
    }),
  ]);

  return {
    results,
    page,
    limit,
    totalResults,
  };
};

/**
 * Get audit trail for specific object
 * @param {string} objectType
 * @param {string} objectId
 * @returns {Promise<Array>}
 */
const getAuditTrail = async (objectType, objectId) => {
  return prisma.audit_log.findMany({
    where: {
      object_type: objectType,
      object_id: objectId
    },
    include: {
      audit_event: true
    },
    orderBy: {
      audit_event: {
        event_time: 'desc'
      }
    }
  });
};

module.exports = {
  createAuditEvent,
  createAuditLog,
  logUserAction,
  queryAuditEvents,
  getAuditTrail,
};