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
  deleteAuditEventById,
  getByUserId,
  getByEvent,
};