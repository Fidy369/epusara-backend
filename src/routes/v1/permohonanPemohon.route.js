const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const permohonanPemohonValidation = require('../../validations/permohonanPemohon.validation');
const permohonanPemohonController = require('../../controllers/permohonanPemohon.controller');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     PermohonanPemohon:
 *       type: object
 *       required:
 *         - permohonan_id
 *         - jenis_pengenalan
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated unique identifier
 *         permohonan_id:
 *           type: integer
 *           description: Application ID
 *         nama_pemohon:
 *           type: string
 *           description: Applicant name
 *         jenis_pengenalan:
 *           type: string
 *           description: Identification type
 *         no_pengenalan:
 *           type: string
 *           description: Identification number
 *         ref_hubungan_id:
 *           type: integer
 *           description: Relationship reference ID
 *         hubungan_lain:
 *           type: string
 *           description: Other relationship description
 *         is_waris:
 *           type: boolean
 *           description: Is heir flag
 *         phone:
 *           type: string
 *           description: Phone number
 *         email:
 *           type: string
 *           format: email
 *           description: Email address
 *         address1:
 *           type: string
 *           description: Address line 1
 *         address2:
 *           type: string
 *           description: Address line 2
 *         address3:
 *           type: string
 *           description: Address line 3
 *         poskod:
 *           type: string
 *           description: Postal code
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
 *   name: PermohonanPemohon
 *   description: Application applicant management
 */

/**
 * @swagger
 * /application-applicants:
 *   post:
 *     summary: Create application applicant
 *     tags: [PermohonanPemohon]
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
 *               - jenis_pengenalan
 *             properties:
 *               permohonan_id:
 *                 type: integer
 *               nama_pemohon:
 *                 type: string
 *               jenis_pengenalan:
 *                 type: string
 *               no_pengenalan:
 *                 type: string
 *               ref_hubungan_id:
 *                 type: integer
 *               hubungan_lain:
 *                 type: string
 *               is_waris:
 *                 type: boolean
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               address1:
 *                 type: string
 *               address2:
 *                 type: string
 *               address3:
 *                 type: string
 *               poskod:
 *                 type: string
 *               created_by:
 *                 type: integer
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PermohonanPemohon'
 *   get:
 *     summary: Get all application applicants
 *     tags: [PermohonanPemohon]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: permohonan_id
 *         schema:
 *           type: integer
 *         description: Filter by application ID
 *       - in: query
 *         name: nama_pemohon
 *         schema:
 *           type: string
 *         description: Filter by applicant name
 *       - in: query
 *         name: no_pengenalan
 *         schema:
 *           type: string
 *         description: Filter by identification number
 *       - in: query
 *         name: ref_hubungan_id
 *         schema:
 *           type: integer
 *         description: Filter by relationship ID
 *       - in: query
 *         name: is_waris
 *         schema:
 *           type: boolean
 *         description: Filter by heir status
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
 *                 $ref: '#/components/schemas/PermohonanPemohon'
 */
router
  .route('/')
  .post(/*auth(),*/ validate(permohonanPemohonValidation.createPermohonanPemohon), permohonanPemohonController.createPermohonanPemohon)
  .get(/*auth(),*/ validate(permohonanPemohonValidation.getPermohonanPemohon), permohonanPemohonController.getPermohonanPemohon);

/**
 * @swagger
 * /application-applicants/{id}:
 *   get:
 *     summary: Get application applicant by ID
 *     tags: [PermohonanPemohon]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Applicant ID
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PermohonanPemohon'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   patch:
 *     summary: Update application applicant
 *     tags: [PermohonanPemohon]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Applicant ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               permohonan_id:
 *                 type: integer
 *               nama_pemohon:
 *                 type: string
 *               jenis_pengenalan:
 *                 type: string
 *               no_pengenalan:
 *                 type: string
 *               ref_hubungan_id:
 *                 type: integer
 *               hubungan_lain:
 *                 type: string
 *               is_waris:
 *                 type: boolean
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               address1:
 *                 type: string
 *               address2:
 *                 type: string
 *               address3:
 *                 type: string
 *               poskod:
 *                 type: string
 *               updated_by:
 *                 type: integer
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PermohonanPemohon'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   delete:
 *     summary: Delete application applicant
 *     tags: [PermohonanPemohon]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Applicant ID
 *     responses:
 *       "204":
 *         description: No content
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
router
  .route('/:id')
  .get(/*auth(),*/ validate(permohonanPemohonValidation.getPermohonanPemohonById), permohonanPemohonController.getPermohonanPemohonById)
  .patch(/*auth(),*/ validate(permohonanPemohonValidation.updatePermohonanPemohon), permohonanPemohonController.updatePermohonanPemohon)
  .delete(/*auth(),*/ validate(permohonanPemohonValidation.deletePermohonanPemohon), permohonanPemohonController.deletePermohonanPemohon);

/**
 * @swagger
 * /application-applicants/application/{permohonanId}:
 *   get:
 *     summary: Get applicants by application ID
 *     tags: [PermohonanPemohon]
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
 *                 $ref: '#/components/schemas/PermohonanPemohon'
 */
router.get('/application/:permohonanId', /*auth(),*/ validate(permohonanPemohonValidation.getByPermohonanId), permohonanPemohonController.getByPermohonanId);

/**
 * @swagger
 * /application-applicants/relationship/{hubunganId}:
 *   get:
 *     summary: Get applicants by relationship
 *     tags: [PermohonanPemohon]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: hubunganId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Relationship ID
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PermohonanPemohon'
 */
router.get('/relationship/:hubunganId', /*auth(),*/ validate(permohonanPemohonValidation.getByHubungan), permohonanPemohonController.getByHubungan);

module.exports = router;