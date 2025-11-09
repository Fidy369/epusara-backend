const httpStatus = require('http-status').default;
const { PrismaClient } = require('@prisma/client');
const ApiError = require('../utils/ApiError');

const prisma = new PrismaClient();

/**
 * Create a payment record
 * @param {Object} paymentBody
 * @returns {Promise<Payment>}
 */
const createPayment = async (paymentBody) => {
  // Verify application exists
  const application = await prisma.permohonan.findUnique({
    where: { id: paymentBody.permohonan_id }
  });
  if (!application) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Application not found');
  }

  return prisma.permohonan_bayaran.create({
    data: {
      ...paymentBody,
      status_bayaran: paymentBody.status_bayaran || 'PENDING'
    },
    include: {
      permohonan: true
    }
  });
};

/**
 * Query for payments
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<QueryResult>}
 */
const queryPayments = async (filter = {}, options = {}) => {
  const limit = parseInt(options.limit, 10) || 10;
  const page = parseInt(options.page, 10) || 1;
  const sortBy = options.sortBy || 'created_at:desc';
  const [sortField, sortOrder] = sortBy.split(':');

  const [totalResults, results] = await Promise.all([
    prisma.permohonan_bayaran.count({ where: filter }),
    prisma.permohonan_bayaran.findMany({
      where: filter,
      orderBy: { [sortField]: sortOrder },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        permohonan: {
          include: {
            permohonan_pemohon: true,
            permohonan_jenazah: true
          }
        }
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
 * Get payment by id
 * @param {number} id
 * @returns {Promise<Payment>}
 */
const getPaymentById = async (id) => {
  return prisma.permohonan_bayaran.findUnique({ 
    where: { id },
    include: {
      permohonan: {
        include: {
          permohonan_pemohon: true,
          permohonan_jenazah: true
        }
      }
    }
  });
};

/**
 * Get payments by application
 * @param {number} applicationId
 * @returns {Promise<Array>}
 */
const getPaymentsByApplication = async (applicationId) => {
  return prisma.permohonan_bayaran.findMany({
    where: { permohonan_id: applicationId },
    include: {
      permohonan: true
    }
  });
};

/**
 * Update payment by id
 * @param {number} paymentId
 * @param {Object} updateBody
 * @returns {Promise<Payment>}
 */
const updatePaymentById = async (paymentId, updateBody) => {
  const payment = await getPaymentById(paymentId);
  if (!payment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Payment not found');
  }

  return prisma.permohonan_bayaran.update({
    where: { id: paymentId },
    data: updateBody,
  });
};

/**
 * Process payment (mark as paid)
 * @param {number} paymentId
 * @param {string} receiptNumber
 * @returns {Promise<Payment>}
 */
const processPayment = async (paymentId, receiptNumber) => {
  const payment = await getPaymentById(paymentId);
  if (!payment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Payment not found');
  }

  if (payment.status_bayaran === 'PAID') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Payment already processed');
  }

  return prisma.permohonan_bayaran.update({
    where: { id: paymentId },
    data: {
      status_bayaran: 'PAID',
      no_resit: receiptNumber,
      updated_at: new Date()
    },
  });
};

/**
 * Cancel payment
 * @param {number} paymentId
 * @returns {Promise<Payment>}
 */
const cancelPayment = async (paymentId) => {
  const payment = await getPaymentById(paymentId);
  if (!payment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Payment not found');
  }

  if (payment.status_bayaran === 'PAID') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Cannot cancel paid payment');
  }

  return prisma.permohonan_bayaran.update({
    where: { id: paymentId },
    data: {
      status_bayaran: 'CANCELLED',
      updated_at: new Date()
    },
  });
};

/**
 * Generate payment summary
 * @param {Object} filter
 * @returns {Promise<Object>}
 */
const getPaymentSummary = async (filter = {}) => {
  const [totalPayments, paidPayments, pendingPayments, cancelledPayments] = await Promise.all([
    prisma.permohonan_bayaran.count({ where: filter }),
    prisma.permohonan_bayaran.count({ where: { ...filter, status_bayaran: 'PAID' } }),
    prisma.permohonan_bayaran.count({ where: { ...filter, status_bayaran: 'PENDING' } }),
    prisma.permohonan_bayaran.count({ where: { ...filter, status_bayaran: 'CANCELLED' } })
  ]);

  return {
    total: totalPayments,
    paid: paidPayments,
    pending: pendingPayments,
    cancelled: cancelledPayments
  };
};

/**
 * Delete payment by id
 * @param {number} paymentId
 * @returns {Promise<Payment>}
 */
const deletePaymentById = async (paymentId) => {
  const payment = await getPaymentById(paymentId);
  if (!payment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Payment not found');
  }

  if (payment.status_bayaran === 'PAID') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Cannot delete paid payment');
  }

  return prisma.permohonan_bayaran.delete({ where: { id: paymentId } });
};

module.exports = {
  createPayment,
  queryPayments,
  getPaymentById,
  getPaymentsByApplication,
  updatePaymentById,
  processPayment,
  cancelPayment,
  getPaymentSummary,
  deletePaymentById,
};