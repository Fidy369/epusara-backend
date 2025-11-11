const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const permohonanAnggotaBadanValidation = require('../../validations/permohonanAnggotaBadan.validation');
const permohonanAnggotaBadanController = require('../../controllers/permohonanAnggotaBadan.controller');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     PermohonanAnggotaBadan:
 *       type: object
 *       required:
 *         - permohonan_id
 *         - ref_bahagian_badan_kod
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated unique identifier
 *         permohonan_id:
 *           type: integer
 *           description: Application ID
 *         ref_bahagian_badan_kod:
 *           type: string
 *           maxLength: 4
 *           description: Body part reference code
 *         bahagian_badan_others:
 *           type: string
 *           description: Other body parts description
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
 *   name: PermohonanAnggotaBadan
 *   description: Application body parts management
 */

/**
 * @swagger
 * /application-body-parts:
 *   post:
 *     summary: Create application body parts
 *     tags: [PermohonanAnggotaBadan]
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
 *               - ref_bahagian_badan_kod
 *             properties:
 *               permohonan_id:
 *                 type: integer
 *               ref_bahagian_badan_kod:
 *                 type: string
 *                 maxLength: 4
 *               bahagian_badan_others:
 *                 type: string
 *               created_by:
 *                 type: integer
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PermohonanAnggotaBadan'
 *   get:
 *     summary: Get all application body parts
 *     tags: [PermohonanAnggotaBadan]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: permohonan_id
 *         schema:
 *           type: integer
 *         description: Filter by application ID
 *       - in: query
 *         name: ref_bahagian_badan_kod
 *         schema:
 *           type: string
 *         description: Filter by body part code
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
 *                 $ref: '#/components/schemas/PermohonanAnggotaBadan'
 */
router
  .route('/')
  .post(/*auth(),*/ validate(permohonanAnggotaBadanValidation.createPermohonanAnggotaBadan), permohonanAnggotaBadanController.createPermohonanAnggotaBadan)
  .get(/*auth(),*/ validate(permohonanAnggotaBadanValidation.getPermohonanAnggotaBadan), permohonanAnggotaBadanController.getPermohonanAnggotaBadan);

/**
 * @swagger
 * /application-body-parts/{id}:
 *   get:
 *     summary: Get application body parts by ID
 *     tags: [PermohonanAnggotaBadan]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Body parts ID
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PermohonanAnggotaBadan'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   patch:
 *     summary: Update application body parts
 *     tags: [PermohonanAnggotaBadan]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Body parts ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               permohonan_id:
 *                 type: integer
 *               ref_bahagian_badan_kod:
 *                 type: string
 *                 maxLength: 4
 *               bahagian_badan_others:
 *                 type: string
 *               updated_by:
 *                 type: integer
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PermohonanAnggotaBadan'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   delete:
 *     summary: Delete application body parts
 *     tags: [PermohonanAnggotaBadan]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Body parts ID
 *     responses:
 *       "204":
 *         description: No content
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
router
  .route('/:id')
  .get(/*auth(),*/ validate(permohonanAnggotaBadanValidation.getPermohonanAnggotaBadanById), permohonanAnggotaBadanController.getPermohonanAnggotaBadanById)
  .patch(/*auth(),*/ validate(permohonanAnggotaBadanValidation.updatePermohonanAnggotaBadan), permohonanAnggotaBadanController.updatePermohonanAnggotaBadan)
  .delete(/*auth(),*/ validate(permohonanAnggotaBadanValidation.deletePermohonanAnggotaBadan), permohonanAnggotaBadanController.deletePermohonanAnggotaBadan);

/**
 * @swagger
 * /application-body-parts/application/{permohonanId}:
 *   get:
 *     summary: Get body parts by application ID
 *     tags: [PermohonanAnggotaBadan]
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
 *                 $ref: '#/components/schemas/PermohonanAnggotaBadan'
 *   delete:
 *     summary: Delete all body parts by application ID
 *     tags: [PermohonanAnggotaBadan]
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
 *       "204":
 *         description: No content
 */
router
  .route('/application/:permohonanId')
  .get(/*auth(),*/ validate(permohonanAnggotaBadanValidation.getByPermohonanId), permohonanAnggotaBadanController.getByPermohonanId)
  .delete(/*auth(),*/ validate(permohonanAnggotaBadanValidation.deleteByPermohonanId), permohonanAnggotaBadanController.deleteByPermohonanId);

module.exports = router;