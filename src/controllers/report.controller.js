const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { reportService } = require('../services');

const getApplicationStats = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['status_permohonan', 'kod_jenis_permohonan']);
  
  // Add date range filter if provided
  if (req.query.start_date || req.query.end_date) {
    filter.created_at = {};
    if (req.query.start_date) filter.created_at.gte = new Date(req.query.start_date);
    if (req.query.end_date) filter.created_at.lte = new Date(req.query.end_date);
  }

  const stats = await reportService.getApplicationStats(filter);
  res.send(stats);
});

const getBurialLotStats = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['tapak_perkuburan_id', 'zon_id', 'kod_status_kubur']);
  const stats = await reportService.getBurialLotStats(filter);
  res.send(stats);
});

const getPaymentStats = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['status_bayaran', 'permohonan_id']);
  
  // Add date range filter if provided
  if (req.query.start_date || req.query.end_date) {
    filter.created_at = {};
    if (req.query.start_date) filter.created_at.gte = new Date(req.query.start_date);
    if (req.query.end_date) filter.created_at.lte = new Date(req.query.end_date);
  }

  const stats = await reportService.getPaymentStats(filter);
  res.send(stats);
});

const getQuestionStats = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['status', 'kod_kategori_pertanyaan']);
  
  // Add date range filter if provided
  if (req.query.start_date || req.query.end_date) {
    filter.created_at = {};
    if (req.query.start_date) filter.created_at.gte = new Date(req.query.start_date);
    if (req.query.end_date) filter.created_at.lte = new Date(req.query.end_date);
  }

  const stats = await reportService.getQuestionStats(filter);
  res.send(stats);
});

const getApplicationsByMonth = catchAsync(async (req, res) => {
  const year = req.query.year ? parseInt(req.query.year) : new Date().getFullYear();
  const data = await reportService.getApplicationsByMonth(year);
  res.send(data);
});

const getCemeterySiteUtilization = catchAsync(async (req, res) => {
  const data = await reportService.getCemeterySiteUtilization();
  res.send(data);
});

const getTopQuestionCategories = catchAsync(async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : 10;
  const data = await reportService.getTopQuestionCategories(limit);
  res.send(data);
});

const getDashboardSummary = catchAsync(async (req, res) => {
  const summary = await reportService.getDashboardSummary();
  res.send(summary);
});

const getRevenueReport = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['permohonan_id']);
  
  // Add date range filter if provided
  if (req.query.start_date || req.query.end_date) {
    filter.created_at = {};
    if (req.query.start_date) filter.created_at.gte = new Date(req.query.start_date);
    if (req.query.end_date) filter.created_at.lte = new Date(req.query.end_date);
  }

  const report = await reportService.getRevenueReport(filter);
  res.send(report);
});

module.exports = {
  getApplicationStats,
  getBurialLotStats,
  getPaymentStats,
  getQuestionStats,
  getApplicationsByMonth,
  getCemeterySiteUtilization,
  getTopQuestionCategories,
  getDashboardSummary,
  getRevenueReport,
};