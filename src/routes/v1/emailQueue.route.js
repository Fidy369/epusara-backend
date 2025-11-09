const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const emailQueueValidation = require('../../validations/emailQueue.validation');
const emailQueueController = require('../../controllers/emailQueue.controller');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     EmailQueue:
 *       type: object
 *       required:
 *         - recipient
 *         - subject
 *         - body
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated unique identifier
 *         recipient:
 *           type: string
 *           format: email
 *           description: Email recipient address
 *         subject:
 *           type: string
 *           description: Email subject
 *         body:
 *           type: string
 *           description: Email body content
 *         status:
 *           type: string
 *           enum: [pending, sent, failed]
 *           description: Email status
 *         attempts:
 *           type: integer
 *           description: Number of send attempts
 *         last_error:
 *           type: string
 *           description: Last error message if failed
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *         sent_at:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * tags:
 *   name: EmailQueue
 *   description: Email queue management
 */

/**
 * @swagger
 * /email-queue:
 *   post:
 *     summary: Create an email queue entry
 *     tags: [EmailQueue]
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
 *               status:
 *                 type: string
 *                 enum: [pending, sent, failed]
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EmailQueue'
 *   get:
 *     summary: Get all email queue entries
 *     tags: [EmailQueue]
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
 *           enum: [pending, sent, failed]
 *         description: Filter by status
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Sort by field
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Maximum number of results
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EmailQueue'
 */
router
  .route('/')
  .post(/*auth(),*/ validate(emailQueueValidation.createEmailQueue), emailQueueController.createEmailQueue)
  .get(/*auth(),*/ validate(emailQueueValidation.getEmailQueues), emailQueueController.getEmailQueues);

/**
 * @swagger
 * /email-queue/{id}:
 *   get:
 *     summary: Get an email queue entry
 *     tags: [EmailQueue]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Email queue id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EmailQueue'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   put:
 *     summary: Replace an email queue entry (full update)
 *     tags: [EmailQueue]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Email queue id
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
 *               - status
 *             properties:
 *               recipient:
 *                 type: string
 *                 format: email
 *               subject:
 *                 type: string
 *               body:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [pending, sent, failed]
 *               attempts:
 *                 type: integer
 *               last_error:
 *                 type: string
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EmailQueue'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   patch:
 *     summary: Update an email queue entry (partial update)
 *     tags: [EmailQueue]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Email queue id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               recipient:
 *                 type: string
 *                 format: email
 *               subject:
 *                 type: string
 *               body:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [pending, sent, failed]
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EmailQueue'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   delete:
 *     summary: Delete an email queue entry
 *     tags: [EmailQueue]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Email queue id
 *     responses:
 *       "204":
 *         description: No content
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
router
  .route('/:emailQueueId')
  .get(/*auth(),*/ validate(emailQueueValidation.getEmailQueue), emailQueueController.getEmailQueue)
  .put(/*auth(),*/ validate(emailQueueValidation.replaceEmailQueue), emailQueueController.replaceEmailQueue)
  .patch(/*auth(),*/ validate(emailQueueValidation.updateEmailQueue), emailQueueController.updateEmailQueue)
  .delete(/*auth(),*/ validate(emailQueueValidation.deleteEmailQueue), emailQueueController.deleteEmailQueue);

/**
 * @swagger
 * /email-queue/status/{status}:
 *   get:
 *     summary: Get email queue entries by status
 *     tags: [EmailQueue]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *           enum: [pending, sent, failed]
 *         description: Email status
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EmailQueue'
 */
router.get('/status/:status', /*auth(),*/ validate(emailQueueValidation.getEmailQueuesByStatus), emailQueueController.getEmailQueuesByStatus);

/**
 * @swagger
 * /email-queue/{id}/status:
 *   patch:
 *     summary: Update email queue status
 *     tags: [EmailQueue]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Email queue id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, sent, failed]
 *               sentAt:
 *                 type: string
 *                 format: date-time
 *               lastError:
 *                 type: string
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EmailQueue'
 */
router.patch('/:emailQueueId/status', /*auth(),*/ validate(emailQueueValidation.updateEmailQueueStatus), emailQueueController.updateEmailQueueStatus);

/**
 * @swagger
 * /email-queue/{id}/increment-attempts:
 *   patch:
 *     summary: Increment email queue attempts
 *     tags: [EmailQueue]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Email queue id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EmailQueue'
 */
router.patch('/:emailQueueId/increment-attempts', /*auth(),*/ validate(emailQueueValidation.incrementAttempts), emailQueueController.incrementAttempts);

module.exports = router;