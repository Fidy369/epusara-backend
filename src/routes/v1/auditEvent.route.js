const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const auditEventValidation = require('../../validations/auditEvent.validation');
const auditEventController = require('../../controllers/auditEvent.controller');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     AuditEvent:
 *       type: object
 *       required:
 *         - event
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated unique identifier
 *         event_time:
 *           type: string
 *           format: date-time
 *           description: Event timestamp
 *         user_id:
 *           type: integer
 *           description: User ID who triggered the event
 *         ip_address:
 *           type: string
 *           description: IP address of the user
 *         event:
 *           type: string
 *           description: Event type or name
 *         description:
 *           type: string
 *           description: Event description
 */

/**
 * @swagger
 * tags:
 *   name: AuditEvent
 *   description: Audit event management
 */

/**
 * @swagger
 * /audit-events:
 *   post:
 *     summary: Create audit event
 *     tags: [AuditEvent]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - event
 *             properties:
 *               user_id:
 *                 type: integer
 *               ip_address:
 *                 type: string
 *               event:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuditEvent'
 *   get:
 *     summary: Get all audit events
 *     tags: [AuditEvent]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: integer
 *         description: Filter by user ID
 *       - in: query
 *         name: event
 *         schema:
 *           type: string
 *         description: Filter by event type
 *       - in: query
 *         name: ip_address
 *         schema:
 *           type: string
 *         description: Filter by IP address
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
 *                 $ref: '#/components/schemas/AuditEvent'
 */
router
  .route('/')
  .post(/*auth(),*/ validate(auditEventValidation.createAuditEvent), auditEventController.createAuditEvent)
  .get(/*auth(),*/ validate(auditEventValidation.getAuditEvents), auditEventController.getAuditEvents);

/**
 * @swagger
 * /audit-events/{id}:
 *   get:
 *     summary: Get audit event by ID
 *     tags: [AuditEvent]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Audit event ID
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuditEvent'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   patch:
 *     summary: Update audit event
 *     tags: [AuditEvent]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Audit event ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *               ip_address:
 *                 type: string
 *               event:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuditEvent'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   delete:
 *     summary: Delete audit event
 *     tags: [AuditEvent]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Audit event ID
 *     responses:
 *       "204":
 *         description: No content
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
router
  .route('/:id')
  .get(/*auth(),*/ validate(auditEventValidation.getAuditEventById), auditEventController.getAuditEventById)
  .patch(/*auth(),*/ validate(auditEventValidation.updateAuditEvent), auditEventController.updateAuditEvent)
  .delete(/*auth(),*/ validate(auditEventValidation.deleteAuditEvent), auditEventController.deleteAuditEvent);

/**
 * @swagger
 * /audit-events/user/{userId}:
 *   get:
 *     summary: Get audit events by user ID
 *     tags: [AuditEvent]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AuditEvent'
 */
router.get('/user/:userId', /*auth(),*/ validate(auditEventValidation.getByUserId), auditEventController.getByUserId);

/**
 * @swagger
 * /audit-events/event/{event}:
 *   get:
 *     summary: Get audit events by event type
 *     tags: [AuditEvent]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: event
 *         required: true
 *         schema:
 *           type: string
 *         description: Event type
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AuditEvent'
 */
router.get('/event/:event', /*auth(),*/ validate(auditEventValidation.getByEvent), auditEventController.getByEvent);

module.exports = router;