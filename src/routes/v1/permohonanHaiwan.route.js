const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const permohonanHaiwanValidation = require('../../validations/permohonanHaiwan.validation');
const permohonanHaiwanController = require('../../controllers/permohonanHaiwan.controller');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     PermohonanHaiwan:
 *       type: object
 *       required:
 *         - permohonan_id
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated unique identifier
 *         permohonan_id:
 *           type: integer
 *           description: Application ID
 *         ref_jenis_haiwan_kod:
 *           type: string
 *           maxLength: 4
 *           description: Animal type reference code
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
 *   name: PermohonanHaiwan
 *   description: Application animal management
 */

/**
 * @swagger
 * /application-animals:
 *   post:
 *     summary: Create application animal
 *     tags: [PermohonanHaiwan]
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
 *               permohonan_id:
 *                 type: integer
 *               ref_jenis_haiwan_kod:
 *                 type: string
 *                 maxLength: 4
 *               created_by:
 *                 type: integer
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PermohonanHaiwan'
 *   get:
 *     summary: Get all application animals
 *     tags: [PermohonanHaiwan]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: permohonan_id
 *         schema:
 *           type: integer
 *         description: Filter by application ID
 *       - in: query
 *         name: ref_jenis_haiwan_kod
 *         schema:
 *           type: string
 *         description: Filter by animal type code
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
 *                 $ref: '#/components/schemas/PermohonanHaiwan'
 */
router
  .route('/')
  .post(/*auth(),*/ validate(permohonanHaiwanValidation.createPermohonanHaiwan), permohonanHaiwanController.createPermohonanHaiwan)
  .get(/*auth(),*/ validate(permohonanHaiwanValidation.getPermohonanHaiwan), permohonanHaiwanController.getPermohonanHaiwan);

/**
 * @swagger
 * /application-animals/{id}:
 *   get:
 *     summary: Get application animal by ID
 *     tags: [PermohonanHaiwan]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Animal ID
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PermohonanHaiwan'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   patch:
 *     summary: Update application animal
 *     tags: [PermohonanHaiwan]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Animal ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               permohonan_id:
 *                 type: integer
 *               ref_jenis_haiwan_kod:
 *                 type: string
 *                 maxLength: 4
 *               updated_by:
 *                 type: integer
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PermohonanHaiwan'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   delete:
 *     summary: Delete application animal
 *     tags: [PermohonanHaiwan]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Animal ID
 *     responses:
 *       "204":
 *         description: No content
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
router
  .route('/:id')
  .get(/*auth(),*/ validate(permohonanHaiwanValidation.getPermohonanHaiwanById), permohonanHaiwanController.getPermohonanHaiwanById)
  .patch(/*auth(),*/ validate(permohonanHaiwanValidation.updatePermohonanHaiwan), permohonanHaiwanController.updatePermohonanHaiwan)
  .delete(/*auth(),*/ validate(permohonanHaiwanValidation.deletePermohonanHaiwan), permohonanHaiwanController.deletePermohonanHaiwan);

/**
 * @swagger
 * /application-animals/application/{permohonanId}:
 *   get:
 *     summary: Get animals by application ID
 *     tags: [PermohonanHaiwan]
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
 *                 $ref: '#/components/schemas/PermohonanHaiwan'
 */
router.get('/application/:permohonanId', /*auth(),*/ validate(permohonanHaiwanValidation.getByPermohonanId), permohonanHaiwanController.getByPermohonanId);

/**
 * @swagger
 * /application-animals/type/{jenisHaiwan}:
 *   get:
 *     summary: Get animals by type
 *     tags: [PermohonanHaiwan]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: jenisHaiwan
 *         required: true
 *         schema:
 *           type: string
 *           maxLength: 4
 *         description: Animal type code
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PermohonanHaiwan'
 */
router.get('/type/:jenisHaiwan', /*auth(),*/ validate(permohonanHaiwanValidation.getByJenisHaiwan), permohonanHaiwanController.getByJenisHaiwan);

module.exports = router;