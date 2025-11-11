const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createEmailQueue = async (emailData) => {
  return prisma.email_queue.create({
    data: emailData,
  });
};

const getEmailQueues = async (filter, options) => {
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy ?? 'created_at';
  const sortType = options.sortType ?? 'desc';

  const emailQueues = await prisma.email_queue.findMany({
    where: filter,
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { [sortBy]: sortType },
  });

  return emailQueues;
};

const getEmailQueueById = async (id) => {
  return prisma.email_queue.findUnique({
    where: { id },
  });
};

const updateEmailQueueById = async (id, updateBody) => {
  return prisma.email_queue.update({
    where: { id },
    data: updateBody,
  });
};

const deleteEmailQueueById = async (id) => {
  return prisma.email_queue.delete({
    where: { id },
  });
};

const getEmailQueuesByStatus = async (status) => {
  return prisma.email_queue.findMany({
    where: { status },
    orderBy: { created_at: 'asc' },
  });
};

const updateEmailQueueStatus = async (id, status, sentAt = null, lastError = null) => {
  const updateData = { status, updated_at: new Date() };
  if (sentAt) updateData.sent_at = sentAt;
  if (lastError) updateData.last_error = lastError;
  
  return prisma.email_queue.update({
    where: { id },
    data: updateData,
  });
};

const incrementAttempts = async (id) => {
  return prisma.email_queue.update({
    where: { id },
    data: {
      attempts: { increment: 1 },
      updated_at: new Date(),
    },
  });
};

module.exports = {
  createEmailQueue,
  getEmailQueues,
  getEmailQueueById,
  updateEmailQueueById,
  deleteEmailQueueById,
  getEmailQueuesByStatus,
  updateEmailQueueStatus,
  incrementAttempts,
};