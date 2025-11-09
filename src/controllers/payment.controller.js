const httpStatus = require('http-status').default;
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { paymentService } = require('../services');

const createPayment = catchAsync(async (req, res) => {
  const payment = await paymentService.createPayment(req.body);
  res.status(httpStatus.CREATED).send(payment);
});

const getPayments = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['permohonan_id', 'status_bayaran', 'no_akaun', 'no_resit']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await paymentService.queryPayments(filter, options);
  res.send(result);
});

const getPayment = catchAsync(async (req, res) => {
  const payment = await paymentService.getPaymentById(parseInt(req.params.paymentId));
  if (!payment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Payment not found');
  }
  res.send(payment);
});

const getPaymentsByApplication = catchAsync(async (req, res) => {
  const payments = await paymentService.getPaymentsByApplication(parseInt(req.params.applicationId));
  res.send(payments);
});

const updatePayment = catchAsync(async (req, res) => {
  const payment = await paymentService.updatePaymentById(parseInt(req.params.paymentId), req.body);
  res.send(payment);
});

const processPayment = catchAsync(async (req, res) => {
  const payment = await paymentService.processPayment(
    parseInt(req.params.paymentId),
    req.body.no_resit
  );
  res.send(payment);
});

const cancelPayment = catchAsync(async (req, res) => {
  const payment = await paymentService.cancelPayment(parseInt(req.params.paymentId));
  res.send(payment);
});

const getPaymentSummary = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['permohonan_id', 'status_bayaran']);
  const summary = await paymentService.getPaymentSummary(filter);
  res.send(summary);
});

const deletePayment = catchAsync(async (req, res) => {
  await paymentService.deletePaymentById(parseInt(req.params.paymentId));
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createPayment,
  getPayments,
  getPayment,
  getPaymentsByApplication,
  updatePayment,
  processPayment,
  cancelPayment,
  getPaymentSummary,
  deletePayment,
};