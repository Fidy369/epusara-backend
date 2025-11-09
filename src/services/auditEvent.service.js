const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createAuditEvent = async (data) => {
  return prisma.audit_event.create({
    data,
  });
};

const getAuditEvents = async (filter, options) => {
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy ?? 'event_time';
  const sortType = options.sortType ?? 'desc';

  return prisma.audit_event.findMany({
    where: filter,
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { [sortBy]: sortType },
  });
};

const getAuditEventById = async (id) => {
  return prisma.audit_event.findUnique({
    where: { id },
  });
};

const updateAuditEventById = async (id, updateBody) => {
  return prisma.audit_event.update({
    where: { id },
    data: updateBody,
  });
};

const replaceAuditEventById = async (id, replaceBody) => {
  // Check if record exists
  const auditEvent = await prisma.audit_event.findUnique({
    where: { id },
  });
  
  if (!auditEvent) {
    throw new Error('Audit event not found');
  }

  // Replace with new data (event is required, others are optional)
  return prisma.audit_event.update({
    where: { id },
    data: {
      user_id: replaceBody.user_id ?? null,
      ip_address: replaceBody.ip_address ?? null,
      event: replaceBody.event,
      description: replaceBody.description ?? null,
    },
  });
};

const deleteAuditEventById = async (id) => {
  return prisma.audit_event.delete({
    where: { id },
  });
};

const getByUserId = async (userId) => {
  return prisma.audit_event.findMany({
    where: { user_id: userId },
    orderBy: { event_time: 'desc' },
  });
};

const getByEvent = async (event) => {
  return prisma.audit_event.findMany({
    where: { event },
    orderBy: { event_time: 'desc' },
  });
};

module.exports = {
  createAuditEvent,
  getAuditEvents,
  getAuditEventById,
  updateAuditEventById,
  replaceAuditEventById,
  deleteAuditEventById,
  getByUserId,
  getByEvent,
};