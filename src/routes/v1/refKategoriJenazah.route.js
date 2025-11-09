const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const refKategoriJenazahValidation = require('../../validations/refKategoriJenazah.validation');
const refKategoriJenazahController = require('../../controllers/refKategoriJenazah.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: RefKategoriJenazah
 *   description: Deceased category reference management
 */

/**
 * @swagger
 * /ref_kategori_jenazah:
 *   post:
 *     summary: Create deceased category reference
 *     tags: [RefKategoriJenazah]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - kod_kategori_jenazah
 *               - label_ms
 *               - label_en
 *               - flag_aktif
 *             properties:
 *               kod_kategori_jenazah:
 *                 type: string
 *                 maxLength: 4
 *               label_ms:
 *                 type: string
 *                 maxLength: 50
 *               label_en:
 *                 type: string
 *                 maxLength: 50
 *               harga:
 *                 type: number
 *                 format: decimal
 *                 minimum: 0
 *                 default: 0.00
 *               flag_aktif:
 *                 type: integer
 *                 enum: [0, 1]
 *     responses:
 *       "201":
 *         description: Created
 *   get:
 *     summary: Get all deceased category references
 *     tags: [RefKategoriJenazah]
 *     parameters:
 *       - in: query
 *         name: kod_kategori_jenazah
 *         schema:
 *           type: string
 *           maxLength: 4
 *       - in: query
 *         name: label_ms
 *         schema:
 *           type: string
 *       - in: query
 *         name: label_en
 *         schema:
 *           type: string
 *       - in: query
 *         name: flag_aktif
 *         schema:
 *           type: integer
 *           enum: [0, 1]
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
  .post(/*auth(),*/ validate(refKategoriJenazahValidation.createRefKategoriJenazah), refKategoriJenazahController.createRefKategoriJenazah)
  .get(/*auth(),*/ validate(refKategoriJenazahValidation.getRefKategoriJenazahs), refKategoriJenazahController.getRefKategoriJenazahs);

/**
 * @swagger
 * /ref_kategori_jenazah/{id}:
 *   get:
 *     summary: Get deceased category reference by ID
 *     tags: [RefKategoriJenazah]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Deceased category ID
 *     responses:
 *       "200":
 *         description: OK
 *       "404":
 *         description: Not found
 *   put:
 *     summary: Replace deceased category reference (full update)
 *     tags: [RefKategoriJenazah]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Deceased category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - kod_kategori_jenazah
 *               - label_ms
 *               - label_en
 *               - flag_aktif
 *             properties:
 *               kod_kategori_jenazah:
 *                 type: string
 *                 maxLength: 4
 *               label_ms:
 *                 type: string
 *                 maxLength: 50
 *               label_en:
 *                 type: string
 *                 maxLength: 50
 *               harga:
 *                 type: number
 *                 format: decimal
 *                 minimum: 0
 *                 default: 0.00
 *               flag_aktif:
 *                 type: integer
 *                 enum: [0, 1]
 *               updated_by:
 *                 type: integer
 *     responses:
 *       "200":
 *         description: OK
 *       "404":
 *         description: Not found
 *   patch:
 *     summary: Update deceased category reference (partial update)
 *     tags: [RefKategoriJenazah]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Deceased category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               kod_kategori_jenazah:
 *                 type: string
 *                 maxLength: 4
 *               label_ms:
 *                 type: string
 *                 maxLength: 50
 *               label_en:
 *                 type: string
 *                 maxLength: 50
 *               harga:
 *                 type: number
 *                 format: decimal
 *                 minimum: 0
 *               flag_aktif:
 *                 type: integer
 *                 enum: [0, 1]
 *     responses:
 *       "200":
 *         description: OK
 *       "404":
 *         description: Not found
 *   delete:
 *     summary: Delete deceased category reference
 *     tags: [RefKategoriJenazah]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Deceased category ID
 *     responses:
 *       "204":
 *         description: No content
 *       "404":
 *         description: Not found
 */
router
  .route('/:id')
  .get(/*auth(),*/ validate(refKategoriJenazahValidation.getRefKategoriJenazah), refKategoriJenazahController.getRefKategoriJenazah)
  .put(/*auth(),*/ validate(refKategoriJenazahValidation.replaceRefKategoriJenazah), refKategoriJenazahController.replaceRefKategoriJenazah)
  .patch(/*auth(),*/ validate(refKategoriJenazahValidation.updateRefKategoriJenazah), refKategoriJenazahController.updateRefKategoriJenazah)
  .delete(/*auth(),*/ validate(refKategoriJenazahValidation.deleteRefKategoriJenazah), refKategoriJenazahController.deleteRefKategoriJenazah);

module.exports = router;