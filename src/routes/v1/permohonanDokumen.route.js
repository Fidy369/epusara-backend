const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const permohonanDokumenValidation = require('../../validations/permohonanDokumen.validation');
const permohonanDokumenController = require('../../controllers/permohonanDokumen.controller');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     PermohonanDokumen:
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
 *         jenis_dokumen:
 *           type: string
 *           description: Document type
 *         attachment_id:
 *           type: integer
 *           description: Attachment ID reference
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
 *   name: PermohonanDokumen
 *   description: Application document management
 */

/**
 * @swagger
 * /application-documents:
 *   post:
 *     summary: Create application document
 *     tags: [PermohonanDokumen]
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
 *               jenis_dokumen:
 *                 type: string
 *               attachment_id:
 *                 type: integer
 *               created_by:
 *                 type: integer
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PermohonanDokumen'
 *   get:
 *     summary: Get all application documents
 *     tags: [PermohonanDokumen]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: permohonan_id
 *         schema:
 *           type: integer
 *         description: Filter by application ID
 *       - in: query
 *         name: jenis_dokumen
 *         schema:
 *           type: string
 *         description: Filter by document type
 *       - in: query
 *         name: attachment_id
 *         schema:
 *           type: integer
 *         description: Filter by attachment ID
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
 *                 $ref: '#/components/schemas/PermohonanDokumen'
 */
router
  .route('/')
  .post(/*auth(),*/ validate(permohonanDokumenValidation.createPermohonanDokumen), permohonanDokumenController.createPermohonanDokumen)
  .get(/*auth(),*/ validate(permohonanDokumenValidation.getPermohonanDokumen), permohonanDokumenController.getPermohonanDokumen);

/**
 * @swagger
 * /application-documents/{id}:
 *   get:
 *     summary: Get application document by ID
 *     tags: [PermohonanDokumen]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Document ID
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PermohonanDokumen'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   put:
 *     summary: Replace application document (full update)
 *     tags: [PermohonanDokumen]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Document ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - permohonan_id
 *               - jenis_dokumen
 *             properties:
 *               permohonan_id:
 *                 type: integer
 *               jenis_dokumen:
 *                 type: string
 *               attachment_id:
 *                 type: integer
 *               updated_by:
 *                 type: integer
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PermohonanDokumen'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   patch:
 *     summary: Update application document (partial update)
 *     tags: [PermohonanDokumen]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Document ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               permohonan_id:
 *                 type: integer
 *               jenis_dokumen:
 *                 type: string
 *               attachment_id:
 *                 type: integer
 *               updated_by:
 *                 type: integer
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PermohonanDokumen'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   delete:
 *     summary: Delete application document
 *     tags: [PermohonanDokumen]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Document ID
 *     responses:
 *       "204":
 *         description: No content
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
router
  .route('/:id')
  .get(/*auth(),*/ validate(permohonanDokumenValidation.getPermohonanDokumenById), permohonanDokumenController.getPermohonanDokumenById)
  .put(/*auth(),*/ validate(permohonanDokumenValidation.putPermohonanDokumen), permohonanDokumenController.putPermohonanDokumen)
  .patch(/*auth(),*/ validate(permohonanDokumenValidation.updatePermohonanDokumen), permohonanDokumenController.updatePermohonanDokumen)
  .delete(/*auth(),*/ validate(permohonanDokumenValidation.deletePermohonanDokumen), permohonanDokumenController.deletePermohonanDokumen);

/**
 * @swagger
 * /application-documents/application/{permohonanId}:
 *   get:
 *     summary: Get documents by application ID
 *     tags: [PermohonanDokumen]
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
 *                 $ref: '#/components/schemas/PermohonanDokumen'
 */
router.get('/application/:permohonanId', /*auth(),*/ validate(permohonanDokumenValidation.getByPermohonanId), permohonanDokumenController.getByPermohonanId);

/**
 * @swagger
 * /application-documents/type/{jenisDokumen}:
 *   get:
 *     summary: Get documents by type
 *     tags: [PermohonanDokumen]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: jenisDokumen
 *         required: true
 *         schema:
 *           type: string
 *         description: Document type
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PermohonanDokumen'
 */
router.get('/type/:jenisDokumen', /*auth(),*/ validate(permohonanDokumenValidation.getByJenisDokumen), permohonanDokumenController.getByJenisDokumen);

module.exports = router;