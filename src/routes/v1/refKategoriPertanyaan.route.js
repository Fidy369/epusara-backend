const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const refKategoriPertanyaanValidation = require('../../validations/refKategoriPertanyaan.validation');
const refKategoriPertanyaanController = require('../../controllers/refKategoriPertanyaan.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: RefKategoriPertanyaan
 *   description: Question category reference management
 */

/**
 * @swagger
 * /ref_kategori_pertanyaan:
 *   post:
 *     summary: Create question category reference
 *     tags: [RefKategoriPertanyaan]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - kod_kategori_pertanyaan
 *               - label_ms
 *               - label_en
 *             properties:
 *               kod_kategori_pertanyaan:
 *                 type: string
 *                 maxLength: 5
 *               label_ms:
 *                 type: string
 *                 maxLength: 50
 *               label_en:
 *                 type: string
 *                 maxLength: 50
 *               order_sequence:
 *                 type: integer
 *                 minimum: 0
 *                 default: 0
 *               is_active:
 *                 type: boolean
 *                 default: false
 *     responses:
 *       "201":
 *         description: Created
 *   get:
 *     summary: Get all question category references
 *     tags: [RefKategoriPertanyaan]
 *     parameters:
 *       - in: query
 *         name: kod_kategori_pertanyaan
 *         schema:
 *           type: string
 *           maxLength: 5
 *       - in: query
 *         name: label_ms
 *         schema:
 *           type: string
 *       - in: query
 *         name: label_en
 *         schema:
 *           type: string
 *       - in: query
 *         name: is_active
 *         schema:
 *           type: boolean
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
  .post(/*auth(),*/ validate(refKategoriPertanyaanValidation.createRefKategoriPertanyaan), refKategoriPertanyaanController.createRefKategoriPertanyaan)
  .get(/*auth(),*/ validate(refKategoriPertanyaanValidation.getRefKategoriPertanyaans), refKategoriPertanyaanController.getRefKategoriPertanyaans);

/**
 * @swagger
 * /ref_kategori_pertanyaan/{kod}:
 *   get:
 *     summary: Get question category reference by code
 *     tags: [RefKategoriPertanyaan]
 *     parameters:
 *       - in: path
 *         name: kod
 *         required: true
 *         schema:
 *           type: string
 *           maxLength: 5
 *         description: Question category code
 *     responses:
 *       "200":
 *         description: OK
 *       "404":
 *         description: Not found
 *   patch:
 *     summary: Update question category reference
 *     tags: [RefKategoriPertanyaan]
 *     parameters:
 *       - in: path
 *         name: kod
 *         required: true
 *         schema:
 *           type: string
 *           maxLength: 5
 *         description: Question category code
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               label_ms:
 *                 type: string
 *                 maxLength: 50
 *               label_en:
 *                 type: string
 *                 maxLength: 50
 *               order_sequence:
 *                 type: integer
 *                 minimum: 0
 *               is_active:
 *                 type: boolean
 *     responses:
 *       "200":
 *         description: OK
 *       "404":
 *         description: Not found
 *   put:
 *     summary: Replace question category reference (full update)
 *     tags: [RefKategoriPertanyaan]
 *     parameters:
 *       - in: path
 *         name: kod
 *         required: true
 *         schema:
 *           type: string
 *           maxLength: 5
 *         description: Question category code
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - label_ms
 *               - label_en
 *             properties:
 *               label_ms:
 *                 type: string
 *                 maxLength: 50
 *               label_en:
 *                 type: string
 *                 maxLength: 50
 *               order_sequence:
 *                 type: integer
 *                 minimum: 0
 *                 default: 0
 *               is_active:
 *                 type: boolean
 *                 default: false
 *     responses:
 *       "200":
 *         description: OK
 *       "404":
 *         description: Not found
 *   delete:
 *     summary: Delete question category reference
 *     tags: [RefKategoriPertanyaan]
 *     parameters:
 *       - in: path
 *         name: kod
 *         required: true
 *         schema:
 *           type: string
 *           maxLength: 5
 *         description: Question category code
 *     responses:
 *       "204":
 *         description: No content
 *       "404":
 *         description: Not found
 */
router
  .route('/:kod')
  .get(/*auth(),*/ validate(refKategoriPertanyaanValidation.getRefKategoriPertanyaan), refKategoriPertanyaanController.getRefKategoriPertanyaan)
  .patch(/*auth(),*/ validate(refKategoriPertanyaanValidation.updateRefKategoriPertanyaan), refKategoriPertanyaanController.updateRefKategoriPertanyaan)
  .put(/*auth(),*/ validate(refKategoriPertanyaanValidation.replaceRefKategoriPertanyaan), refKategoriPertanyaanController.replaceRefKategoriPertanyaan)
  .delete(/*auth(),*/ validate(refKategoriPertanyaanValidation.deleteRefKategoriPertanyaan), refKategoriPertanyaanController.deleteRefKategoriPertanyaan);

module.exports = router;