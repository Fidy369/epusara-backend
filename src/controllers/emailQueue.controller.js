const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { emailQueueService } = require('../services');

/**
 * @swagger
 * /email-queue:
 *   post:
 *     summary: Create a new email queue entry
 *     tags: [Email]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - recipient
 *               - subject
 *               - body
 *             properties:
 *               recipient:
 *                 type: string
 *                 format: email
 *               subject:
 *                 type: string
 *               body:
 *                 type: string
 *     responses:
 *       201:
 *         description: Email queue entry created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EmailQueue'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
const createEmailQueue = catchAsync(async (req, res) => {
  const emailQueue = await emailQueueService.createEmailQueue(req.body);
  res.status(httpStatus.CREATED).send(emailQueue);
});

/**
 * @swagger
 * /email-queue:
 *   get:
 *     summary: Get email queue entries with pagination and filtering
 *     tags: [Email]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: recipient
 *         schema:
 *           type: string
 *         description: Filter by recipient email
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, sent, failed, retry]
 *         description: Filter by email status
 *       - in: query
 *         name: subject
 *         schema:
 *           type: string
 *         description: Filter by email subject
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Sort by field
 *     responses:
 *       200:
 *         description: List of email queue entries
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/PaginatedResponse'
 *                 - type: object
 *                   properties:
 *                     results:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/EmailQueue'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
const getEmailQueues = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['recipient', 'status', 'subject']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'sortType']);
  const result = await emailQueueService.getEmailQueues(filter, options);
  res.send(result);
});

/**
 * @swagger
 * /email-queue/{id}:
 *   get:
 *     summary: Get email queue entry by ID
 *     tags: [Email]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Email queue entry ID
 *     responses:
 *       200:
 *         description: Email queue entry details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EmailQueue'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
const getEmailQueue = catchAsync(async (req, res) => {
  const emailQueue = await emailQueueService.getEmailQueueById(req.params.emailQueueId);
  if (!emailQueue) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Email queue not found');
  }
  res.send(emailQueue);
});

const updateEmailQueue = catchAsync(async (req, res) => {
  const emailQueue = await emailQueueService.updateEmailQueueById(req.params.emailQueueId, req.body);
  res.send(emailQueue);
});

const deleteEmailQueue = catchAsync(async (req, res) => {
  const emailQueue = await emailQueueService.getEmailQueueById(req.params.emailQueueId);
  if (!emailQueue) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Email queue not found');
  }
  await emailQueueService.deleteEmailQueueById(req.params.emailQueueId);
  res.status(204).send();
});

const getEmailQueuesByStatus = catchAsync(async (req, res) => {
  const result = await emailQueueService.getEmailQueuesByStatus(req.params.status);
  res.send(result);
});

const updateEmailQueueStatus = catchAsync(async (req, res) => {
  const { status, sentAt, lastError } = req.body;
  const emailQueue = await emailQueueService.updateEmailQueueStatus(req.params.emailQueueId, status, sentAt, lastError);
  res.send(emailQueue);
});

const incrementAttempts = catchAsync(async (req, res) => {
  const emailQueue = await emailQueueService.incrementAttempts(req.params.emailQueueId);
  res.send(emailQueue);
});

module.exports = {
  createEmailQueue,
  getEmailQueues,
  getEmailQueue,
  updateEmailQueue,
  deleteEmailQueue,
  getEmailQueuesByStatus,
  updateEmailQueueStatus,
  incrementAttempts,
};