const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const auditLogValidation = require('../../validations/auditLog.validation');
const auditLogController = require('../../controllers/auditLog.controller');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     AuditLog:
 *       type: object
 *       required:
 *         - event_id
 *         - object_type
 *         - object_id
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated unique identifier
 *         event_id:
 *           type: integer
 *           description: Audit event ID reference
 *         object_type:
 *           type: string
 *           description: Type of object being audited
 *         object_id:
 *           type: string
 *           description: ID of the object being audited
 *         changed_data:
 *           type: object
 *           description: JSON data of changes made
 */

/**
 * @swagger
 * tags:
 *   name: AuditLog
 *   description: Audit log management
 */

/**
 * @swagger
 * /audit-logs:
 *   post:
 *     summary: Create audit log
 *     tags: [AuditLog]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - event_id
 *               - object_type
 *               - object_id
 *             properties:
 *               event_id:
 *                 type: integer
 *               object_type:
 *                 type: string
 *               object_id:
 *                 type: string
 *               changed_data:
 *                 type: object
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuditLog'
 *   get:
 *     summary: Get all audit logs
 *     tags: [AuditLog]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: event_id
 *         schema:
 *           type: integer
 *         description: Filter by event ID
 *       - in: query
 *         name: object_type
 *         schema:
 *           type: string
 *         description: Filter by object type
 *       - in: query
 *         name: object_id
 *         schema:
 *           type: string
 *         description: Filter by object ID
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
 *                 $ref: '#/components/schemas/AuditLog'
 */
router
  .route('/')
  .post(/*auth(),*/ validate(auditLogValidation.createAuditLog), auditLogController.createAuditLog)
  .get(/*auth(),*/ validate(auditLogValidation.getAuditLogs), auditLogController.getAuditLogs);

/**
 * @swagger
 * /audit-logs/{id}:
 *   get:
 *     summary: Get audit log by ID
 *     tags: [AuditLog]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Audit log ID
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuditLog'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   patch:
 *     summary: Update audit log
 *     tags: [AuditLog]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Audit log ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               event_id:
 *                 type: integer
 *               object_type:
 *                 type: string
 *               object_id:
 *                 type: string
 *               changed_data:
 *                 type: object
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuditLog'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   delete:
 *     summary: Delete audit log
 *     tags: [AuditLog]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Audit log ID
 *     responses:
 *       "204":
 *         description: No content
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
router
  .route('/:id')
  .get(/*auth(),*/ validate(auditLogValidation.getAuditLogById), auditLogController.getAuditLogById)
  .patch(/*auth(),*/ validate(auditLogValidation.updateAuditLog), auditLogController.updateAuditLog)
  .delete(/*auth(),*/ validate(auditLogValidation.deleteAuditLog), auditLogController.deleteAuditLog);

/**
 * @swagger
 * /audit-logs/event/{eventId}:
 *   get:
 *     summary: Get audit logs by event ID
 *     tags: [AuditLog]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Event ID
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AuditLog'
 */
router.get('/event/:eventId', /*auth(),*/ validate(auditLogValidation.getByEventId), auditLogController.getByEventId);

/**
 * @swagger
 * /audit-logs/object-type/{objectType}:
 *   get:
 *     summary: Get audit logs by object type
 *     tags: [AuditLog]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: objectType
 *         required: true
 *         schema:
 *           type: string
 *         description: Object type
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AuditLog'
 */
router.get('/object-type/:objectType', /*auth(),*/ validate(auditLogValidation.getByObjectType), auditLogController.getByObjectType);

module.exports = router;