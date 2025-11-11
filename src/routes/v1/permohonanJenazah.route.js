const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const permohonanJenazahValidation = require('../../validations/permohonanJenazah.validation');
const permohonanJenazahController = require('../../controllers/permohonanJenazah.controller');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     PermohonanJenazah:
 *       type: object
 *       required:
 *         - permohonan_id
 *         - no_pengenalan
 *         - tarikh_lahir
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated unique identifier
 *         permohonan_id:
 *           type: integer
 *           description: Application ID
 *         nama_jenazah:
 *           type: string
 *           description: Deceased person name
 *         kod_warganegara:
 *           type: string
 *           maxLength: 2
 *           description: Nationality code
 *         jenis_pengenalan:
 *           type: string
 *           description: Identification type
 *         no_pengenalan:
 *           type: string
 *           description: Identification number
 *         ref_bangsa_id:
 *           type: integer
 *           description: Race reference ID
 *         kod_jantina:
 *           type: string
 *           description: Gender code
 *         ref_kategori_jenazah_id:
 *           type: integer
 *           description: Deceased category reference ID
 *         tarikh_lahir:
 *           type: string
 *           format: date
 *           description: Birth date
 *         masa_sah_kematian:
 *           type: string
 *           format: date-time
 *           description: Death confirmation time
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
 *           maxLength: 6
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
 *   name: PermohonanJenazah
 *   description: Application deceased person management
 */

/**
 * @swagger
 * /application-deceased:
 *   post:
 *     summary: Create application deceased person
 *     tags: [PermohonanJenazah]
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
 *               - no_pengenalan
 *               - tarikh_lahir
 *             properties:
 *               permohonan_id:
 *                 type: integer
 *               nama_jenazah:
 *                 type: string
 *               kod_warganegara:
 *                 type: string
 *                 maxLength: 2
 *               jenis_pengenalan:
 *                 type: string
 *               no_pengenalan:
 *                 type: string
 *               ref_bangsa_id:
 *                 type: integer
 *               kod_jantina:
 *                 type: string
 *               ref_kategori_jenazah_id:
 *                 type: integer
 *               tarikh_lahir:
 *                 type: string
 *                 format: date
 *               masa_sah_kematian:
 *                 type: string
 *                 format: date-time
 *               address1:
 *                 type: string
 *               address2:
 *                 type: string
 *               address3:
 *                 type: string
 *               poskod:
 *                 type: string
 *                 maxLength: 6
 *               created_by:
 *                 type: integer
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PermohonanJenazah'
 *   get:
 *     summary: Get all application deceased persons
 *     tags: [PermohonanJenazah]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: permohonan_id
 *         schema:
 *           type: integer
 *         description: Filter by application ID
 *       - in: query
 *         name: nama_jenazah
 *         schema:
 *           type: string
 *         description: Filter by deceased name
 *       - in: query
 *         name: no_pengenalan
 *         schema:
 *           type: string
 *         description: Filter by identification number
 *       - in: query
 *         name: ref_kategori_jenazah_id
 *         schema:
 *           type: integer
 *         description: Filter by deceased category
 *       - in: query
 *         name: kod_warganegara
 *         schema:
 *           type: string
 *         description: Filter by nationality code
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
 *                 $ref: '#/components/schemas/PermohonanJenazah'
 */
router
  .route('/')
  .post(/*auth(),*/ validate(permohonanJenazahValidation.createPermohonanJenazah), permohonanJenazahController.createPermohonanJenazah)
  .get(/*auth(),*/ validate(permohonanJenazahValidation.getPermohonanJenazah), permohonanJenazahController.getPermohonanJenazah);

/**
 * @swagger
 * /application-deceased/{id}:
 *   get:
 *     summary: Get application deceased person by ID
 *     tags: [PermohonanJenazah]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Deceased person ID
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PermohonanJenazah'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   patch:
 *     summary: Update application deceased person
 *     tags: [PermohonanJenazah]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Deceased person ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               permohonan_id:
 *                 type: integer
 *               nama_jenazah:
 *                 type: string
 *               kod_warganegara:
 *                 type: string
 *                 maxLength: 2
 *               jenis_pengenalan:
 *                 type: string
 *               no_pengenalan:
 *                 type: string
 *               ref_bangsa_id:
 *                 type: integer
 *               kod_jantina:
 *                 type: string
 *               ref_kategori_jenazah_id:
 *                 type: integer
 *               tarikh_lahir:
 *                 type: string
 *                 format: date
 *               masa_sah_kematian:
 *                 type: string
 *                 format: date-time
 *               address1:
 *                 type: string
 *               address2:
 *                 type: string
 *               address3:
 *                 type: string
 *               poskod:
 *                 type: string
 *                 maxLength: 6
 *               updated_by:
 *                 type: integer
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PermohonanJenazah'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   delete:
 *     summary: Delete application deceased person
 *     tags: [PermohonanJenazah]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Deceased person ID
 *     responses:
 *       "204":
 *         description: No content
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
router
  .route('/:id')
  .get(/*auth(),*/ validate(permohonanJenazahValidation.getPermohonanJenazahById), permohonanJenazahController.getPermohonanJenazahById)
  .patch(/*auth(),*/ validate(permohonanJenazahValidation.updatePermohonanJenazah), permohonanJenazahController.updatePermohonanJenazah)
  .delete(/*auth(),*/ validate(permohonanJenazahValidation.deletePermohonanJenazah), permohonanJenazahController.deletePermohonanJenazah);

/**
 * @swagger
 * /application-deceased/application/{permohonanId}:
 *   get:
 *     summary: Get deceased persons by application ID
 *     tags: [PermohonanJenazah]
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
 *                 $ref: '#/components/schemas/PermohonanJenazah'
 */
router.get('/application/:permohonanId', /*auth(),*/ validate(permohonanJenazahValidation.getByPermohonanId), permohonanJenazahController.getByPermohonanId);

/**
 * @swagger
 * /application-deceased/category/{kategoriId}:
 *   get:
 *     summary: Get deceased persons by category
 *     tags: [PermohonanJenazah]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: kategoriId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Deceased category ID
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PermohonanJenazah'
 */
router.get('/category/:kategoriId', /*auth(),*/ validate(permohonanJenazahValidation.getByKategoriJenazah), permohonanJenazahController.getByKategoriJenazah);

module.exports = router;