const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const permohonanBayaranValidation = require('../../validations/permohonanBayaran.validation');
const permohonanBayaranController = require('../../controllers/permohonanBayaran.controller');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     PermohonanBayaran:
 *       type: object
 *       required:
 *         - permohonan_id
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated unique identifier
 *         no_akaun:
 *           type: string
 *           description: Account number
 *         no_bil_pelbagai:
 *           type: string
 *           description: Multiple bill number
 *         no_resit:
 *           type: string
 *           description: Receipt number
 *         permohonan_id:
 *           type: integer
 *           description: Application ID
 *         payment_deadline:
 *           type: string
 *           format: date-time
 *           description: Payment deadline
 *         status_bayaran:
 *           type: string
 *           description: Payment status
 *         created_at:
 *           type: string
 *           format: date-time
 *         created_by:
 *           type: integer
 *         updated_at:
 *           type: string
 *           format: date-time
 *         updated_by:
 *           type: integer
 */

/**
 * @swagger
 * tags:
 *   name: PermohonanBayaran
 *   description: Application payment management
 */

/**
 * @swagger
 * /application-payments:
 *   post:
 *     summary: Create application payment
 *     tags: [PermohonanBayaran]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - permohonan_id
 *             properties:
 *               no_akaun:
 *                 type: string
 *               no_bil_pelbagai:
 *                 type: string
 *               no_resit:
 *                 type: string
 *               permohonan_id:
 *                 type: integer
 *               payment_deadline:
 *                 type: string
 *                 format: date-time
 *               status_bayaran:
 *                 type: string
 *               created_by:
 *                 type: integer
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PermohonanBayaran'
 *   get:
 *     summary: Get all application payments
 *     tags: [PermohonanBayaran]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: permohonan_id
 *         schema:
 *           type: integer
 *         description: Filter by application ID
 *       - in: query
 *         name: status_bayaran
 *         schema:
 *           type: string
 *         description: Filter by payment status
 *       - in: query
 *         name: no_akaun
 *         schema:
 *           type: string
 *         description: Filter by account number
 *       - in: query
 *         name: no_resit
 *         schema:
 *           type: string
 *         description: Filter by receipt number
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
 *                 $ref: '#/components/schemas/PermohonanBayaran'
 */
router
  .route('/')
  .post(/*auth(),*/ validate(permohonanBayaranValidation.createPermohonanBayaran), permohonanBayaranController.createPermohonanBayaran)
  .get(/*auth(),*/ validate(permohonanBayaranValidation.getPermohonanBayaran), permohonanBayaranController.getPermohonanBayaran);

/**
 * @swagger
 * /application-payments/{id}:
 *   get:
 *     summary: Get application payment by ID
 *     tags: [PermohonanBayaran]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Payment ID
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PermohonanBayaran'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   put:
 *     summary: Replace application payment (full update)
 *     tags: [PermohonanBayaran]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Payment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - permohonan_id
 *             properties:
 *               no_akaun:
 *                 type: string
 *               no_bil_pelbagai:
 *                 type: string
 *               no_resit:
 *                 type: string
 *               permohonan_id:
 *                 type: integer
 *               payment_deadline:
 *                 type: string
 *                 format: date-time
 *               status_bayaran:
 *                 type: string
 *               updated_by:
 *                 type: integer
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PermohonanBayaran'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   patch:
 *     summary: Update application payment (partial update)
 *     tags: [PermohonanBayaran]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Payment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               no_akaun:
 *                 type: string
 *               no_bil_pelbagai:
 *                 type: string
 *               no_resit:
 *                 type: string
 *               permohonan_id:
 *                 type: integer
 *               payment_deadline:
 *                 type: string
 *                 format: date-time
 *               status_bayaran:
 *                 type: string
 *               updated_by:
 *                 type: integer
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PermohonanBayaran'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   delete:
 *     summary: Delete application payment
 *     tags: [PermohonanBayaran]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Payment ID
 *     responses:
 *       "204":
 *         description: No content
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
router
  .route('/:id')
  .get(/*auth(),*/ validate(permohonanBayaranValidation.getPermohonanBayaranById), permohonanBayaranController.getPermohonanBayaranById)
  .put(/*auth(),*/ validate(permohonanBayaranValidation.replacePermohonanBayaran), permohonanBayaranController.replacePermohonanBayaran)
  .patch(/*auth(),*/ validate(permohonanBayaranValidation.updatePermohonanBayaran), permohonanBayaranController.updatePermohonanBayaran)
  .delete(/*auth(),*/ validate(permohonanBayaranValidation.deletePermohonanBayaran), permohonanBayaranController.deletePermohonanBayaran);

/**
 * @swagger
 * /application-payments/application/{permohonanId}:
 *   get:
 *     summary: Get payments by application ID
 *     tags: [PermohonanBayaran]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: permohonanId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Application ID
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PermohonanBayaran'
 */
router.get('/application/:permohonanId', /*auth(),*/ validate(permohonanBayaranValidation.getByPermohonanId), permohonanBayaranController.getByPermohonanId);

/**
 * @swagger
 * /application-payments/status/{status}:
 *   get:
 *     summary: Get payments by status
 *     tags: [PermohonanBayaran]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *         description: Payment status
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PermohonanBayaran'
 */
router.get('/status/:status', /*auth(),*/ validate(permohonanBayaranValidation.getByStatus), permohonanBayaranController.getByStatus);

module.exports = router;