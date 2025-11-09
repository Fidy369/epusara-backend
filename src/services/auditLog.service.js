const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createAuditLog = async (data) => {
  return prisma.audit_log.create({
    data,
  });
};

const getAuditLogs = async (filter, options) => {
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy ?? 'id';
  const sortType = options.sortType ?? 'desc';

  return prisma.audit_log.findMany({
    where: filter,
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { [sortBy]: sortType },
  });
};

const getAuditLogById = async (id) => {
  return prisma.audit_log.findUnique({
    where: { id },
  });
};

const updateAuditLogById = async (id, updateBody) => {
  return prisma.audit_log.update({
    where: { id },
    data: updateBody,
  });
};

const deleteAuditLogById = async (id) => {
  return prisma.audit_log.delete({
    where: { id },
  });
};

const getByEventId = async (eventId) => {
  return prisma.audit_log.findMany({
    where: { event_id: eventId },
  });
};

const getByObjectType = async (objectType) => {
  return prisma.audit_log.findMany({
    where: { object_type: objectType },
    orderBy: { id: 'desc' },
  });
};

const replaceAuditLogById = async (id, replaceBody) => {
  // Check if record exists
  const auditLog = await prisma.audit_log.findUnique({
    where: { id },
  });
  
  if (!auditLog) {
    throw new Error('Audit log not found');
  }

  // Replace with new data (all fields required)
  return prisma.audit_log.update({
    where: { id },
    data: {
      event_id: replaceBody.event_id,
      object_type: replaceBody.object_type,
      object_id: replaceBody.object_id,
      changed_data: replaceBody.changed_data ?? null,
    },
  });
};

module.exports = {
  createAuditLog,
  getAuditLogs,
  getAuditLogById,
  updateAuditLogById,
  replaceAuditLogById,
  deleteAuditLogById,
  getByEventId,
  getByObjectType,
};