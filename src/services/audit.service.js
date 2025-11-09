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
    totalPages: Math.ceil(totalResults / limit),
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

/**
 * Get audit event by ID
 * @param {number} id
 * @returns {Promise<AuditEvent>}
 */
const getAuditEventById = async (id) => {
  return prisma.audit_event.findUnique({
    where: { id },
    include: {
      audit_log: true
    }
  });
};

/**
 * Update audit event (partial update)
 * @param {number} id
 * @param {Object} updateBody
 * @returns {Promise<AuditEvent>}
 */
const updateAuditEvent = async (id, updateBody) => {
  return prisma.audit_event.update({
    where: { id },
    data: updateBody,
    include: {
      audit_log: true
    }
  });
};

/**
 * Replace audit event (full update)
 * @param {number} id
 * @param {Object} replaceBody
 * @returns {Promise<AuditEvent>}
 */
const replaceAuditEvent = async (id, replaceBody) => {
  const auditEvent = await prisma.audit_event.findUnique({
    where: { id }
  });
  
  if (!auditEvent) {
    throw new Error('Audit event not found');
  }

  return prisma.audit_event.update({
    where: { id },
    data: {
      user_id: replaceBody.user_id ?? null,
      ip_address: replaceBody.ip_address ?? null,
      event: replaceBody.event,
      description: replaceBody.description ?? null,
    },
    include: {
      audit_log: true
    }
  });
};

/**
 * Get audit log by ID
 * @param {number} id
 * @returns {Promise<AuditLog>}
 */
const getAuditLogById = async (id) => {
  return prisma.audit_log.findUnique({
    where: { id },
    include: {
      audit_event: true
    }
  });
};

/**
 * Update audit log (partial update)
 * @param {number} id
 * @param {Object} updateBody
 * @returns {Promise<AuditLog>}
 */
const updateAuditLog = async (id, updateBody) => {
  return prisma.audit_log.update({
    where: { id },
    data: updateBody,
    include: {
      audit_event: true
    }
  });
};

/**
 * Replace audit log (full update)
 * @param {number} id
 * @param {Object} replaceBody
 * @returns {Promise<AuditLog>}
 */
const replaceAuditLog = async (id, replaceBody) => {
  const auditLog = await prisma.audit_log.findUnique({
    where: { id }
  });
  
  if (!auditLog) {
    throw new Error('Audit log not found');
  }

  return prisma.audit_log.update({
    where: { id },
    data: {
      event_id: replaceBody.event_id,
      object_type: replaceBody.object_type,
      object_id: replaceBody.object_id,
      changed_data: replaceBody.changed_data ?? null,
    },
    include: {
      audit_event: true
    }
  });
};

/**
 * Delete audit event
 * @param {number} id
 * @returns {Promise<AuditEvent>}
 */
const deleteAuditEvent = async (id) => {
  return prisma.audit_event.delete({
    where: { id }
  });
};

/**
 * Delete audit log
 * @param {number} id
 * @returns {Promise<AuditLog>}
 */
const deleteAuditLog = async (id) => {
  return prisma.audit_log.delete({
    where: { id }
  });
};

module.exports = {
  createAuditEvent,
  createAuditLog,
  logUserAction,
  queryAuditEvents,
  getAuditTrail,
  getAuditEventById,
  updateAuditEvent,
  replaceAuditEvent,
  getAuditLogById,
  updateAuditLog,
  replaceAuditLog,
  deleteAuditEvent,
  deleteAuditLog,
};