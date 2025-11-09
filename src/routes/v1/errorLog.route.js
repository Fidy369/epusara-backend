const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const errorLogValidation = require('../../validations/errorLog.validation');
const errorLogController = require('../../controllers/errorLog.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Error Logs
 *   description: System error logging and monitoring
 */

/**
 * @swagger
 * /error-logs:
 *   post:
 *     summary: Create error log
 *     tags: [Error Logs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - message
 *             properties:
 *               type:
 *                 type: string
 *               message:
 *                 type: string
 *               file:
 *                 type: string
 *               line:
 *                 type: integer
 *               trace:
 *                 type: string
 *               context:
 *                 type: string
 *               user_id:
 *                 type: integer
 *               ip_address:
 *                 type: string
 *               method:
 *                 type: string
 *               url:
 *                 type: string
 *     responses:
 *       "201":
 *         description: Created
 *   get:
 *     summary: Query error logs
 *     tags: [Error Logs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: integer
 *       - in: query
 *         name: dateFrom
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: dateTo
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 1
 *     responses:
 *       "200":
 *         description: OK
 */
router
  .route('/')
  .post(/*auth('manageErrorLogs'),*/ validate(errorLogValidation.createErrorLog), errorLogController.createErrorLog)
  .get(/*auth('viewErrorLogs'),*/ validate(errorLogValidation.queryErrorLogs), errorLogController.queryErrorLogs);

/**
 * @swagger
 * /error-logs/{errorId}:
 *   get:
 *     summary: Get error log
 *     tags: [Error Logs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: errorId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       "200":
 *         description: OK
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   put:
 *     summary: Update error log
 *     tags: [Error Logs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: errorId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *               message:
 *                 type: string
 *               file:
 *                 type: string
 *               line:
 *                 type: integer
 *               trace:
 *                 type: string
 *               context:
 *                 type: string
 *               user_id:
 *                 type: integer
 *               ip_address:
 *                 type: string
 *               method:
 *                 type: string
 *               url:
 *                 type: string
 *     responses:
 *       "200":
 *         description: OK
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   delete:
 *     summary: Delete error log
 *     tags: [Error Logs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: errorId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       "204":
 *         description: No content
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
router
  .route('/:errorId')
  .get(/*auth('viewErrorLogs'),*/ validate(errorLogValidation.getErrorLog), errorLogController.getErrorLog)
  .put(/*auth('manageErrorLogs'),*/ validate(errorLogValidation.updateErrorLog), errorLogController.updateErrorLog)
  .delete(/*auth('manageErrorLogs'),*/ validate(errorLogValidation.deleteErrorLog), errorLogController.deleteErrorLog);

/**
 * @swagger
 * /error-logs/cleanup:
 *   delete:
 *     summary: Clear old error logs
 *     tags: [Error Logs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: days
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 365
 *         default: 30
 *         description: Delete logs older than specified days
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 deleted_count:
 *                   type: integer
 */
router
  .route('/cleanup')
  .delete(/*auth('manageErrorLogs'),*/ validate(errorLogValidation.clearOldErrorLogs), errorLogController.clearOldErrorLogs);

/**
 * @swagger
 * /error-logs/statistics:
 *   get:
 *     summary: Get error statistics
 *     tags: [Error Logs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: hours
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 168
 *         default: 24
 *         description: Statistics for the last N hours
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 period_hours:
 *                   type: integer
 *                 total_errors:
 *                   type: integer
 *                 error_types:
 *                   type: object
 */
router
  .route('/statistics')
  .get(/*auth('viewErrorLogs'),*/ validate(errorLogValidation.getErrorStatistics), errorLogController.getErrorStatistics);

module.exports = router;