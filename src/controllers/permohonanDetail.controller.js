const httpStatus = require('http-status').default;
const catchAsync = require('../utils/catchAsync');
const { permohonanDetailService } = require('../services');

const createPermohonanDetail = catchAsync(async (req, res) => {
  const detail = await permohonanDetailService.createPermohonanDetail(req.body);
  res.status(httpStatus.CREATED).send(detail);
});

const queryPermohonanDetails = catchAsync(async (req, res) => {
  const filter = {};
  const options = {
    sortBy: req.query.sortBy,
    limit: req.query.limit,
    page: req.query.page,
  };

  if (req.query.permohonan_id) filter.permohonan_id = parseInt(req.query.permohonan_id);
  if (req.query.tapak_perkuburan_id) filter.tapak_perkuburan_id = parseInt(req.query.tapak_perkuburan_id);
  if (req.query.status_permohonan) filter.status_permohonan = req.query.status_permohonan;
  if (req.query.status_pengebumian) filter.status_pengebumian = req.query.status_pengebumian;
  if (req.query.is_in_kawasan_mbjb !== undefined) filter.is_in_kawasan_mbjb = req.query.is_in_kawasan_mbjb === 'true';

  const result = await permohonanDetailService.queryPermohonanDetails(filter, options);
  res.send(result);
});

const getPermohonanDetail = catchAsync(async (req, res) => {
  const detail = await permohonanDetailService.getPermohonanDetailById(parseInt(req.params.detailId));
  if (!detail) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Permohonan detail not found');
  }
  res.send(detail);
});

const getPermohonanDetailByPermohonanId = catchAsync(async (req, res) => {
  const detail = await permohonanDetailService.getPermohonanDetailByPermohonanId(parseInt(req.params.permohonanId));
  if (!detail) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Permohonan detail not found');
  }
  res.send(detail);
});

const updatePermohonanDetail = catchAsync(async (req, res) => {
  const detail = await permohonanDetailService.updatePermohonanDetailById(parseInt(req.params.detailId), req.body);
  res.send(detail);
});

const deletePermohonanDetail = catchAsync(async (req, res) => {
  await permohonanDetailService.deletePermohonanDetailById(parseInt(req.params.detailId));
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createPermohonanDetail,
  queryPermohonanDetails,
  getPermohonanDetail,
  getPermohonanDetailByPermohonanId,
  updatePermohonanDetail,
  deletePermohonanDetail,
};