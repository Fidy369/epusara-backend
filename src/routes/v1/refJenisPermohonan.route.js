const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const refJenisPermohonanValidation = require('../../validations/refJenisPermohonan.validation');
const refJenisPermohonanController = require('../../controllers/refJenisPermohonan.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: RefJenisPermohonan
 *   description: Application type reference management
 */

/**
 * @swagger
 * /ref_jenis_permohonan:
 *   post:
 *     summary: Create application type reference
 *     tags: [RefJenisPermohonan]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - kod_jenis_permohonan
 *             properties:
 *               kod_jenis_permohonan:
 *                 type: string
 *                 maxLength: 2
 *               label_ms:
 *                 type: string
 *                 maxLength: 50
 *               label_en:
 *                 type: string
 *                 maxLength: 50
 *               tempoh_sah_permohonan:
 *                 type: integer
 *                 default: 0
 *               is_active:
 *                 type: boolean
 *     responses:
 *       "201":
 *         description: Created
 *   get:
 *     summary: Get all application type references
 *     tags: [RefJenisPermohonan]
 *     parameters:
 *       - in: query
 *         name: is_active
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: label_ms
 *         schema:
 *           type: string
 *       - in: query
 *         name: label_en
 *         schema:
 *           type: string
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
  .post(/*auth(),*/ validate(refJenisPermohonanValidation.createRefJenisPermohonan), refJenisPermohonanController.createRefJenisPermohonan)
  .get(/*auth(),*/ validate(refJenisPermohonanValidation.getRefJenisPermohonans), refJenisPermohonanController.getRefJenisPermohonans);

/**
 * @swagger
 * /ref_jenis_permohonan/{kod}:
 *   get:
 *     summary: Get application type reference by code
 *     tags: [RefJenisPermohonan]
 *     parameters:
 *       - in: path
 *         name: kod
 *         required: true
 *         schema:
 *           type: string
 *           maxLength: 2
 *         description: Application type code
 *     responses:
 *       "200":
 *         description: OK
 *       "404":
 *         description: Not found
 *   put:
 *     summary: Replace application type reference (full update)
 *     tags: [RefJenisPermohonan]
 *     parameters:
 *       - in: path
 *         name: kod
 *         required: true
 *         schema:
 *           type: string
 *           maxLength: 2
 *         description: Application type code
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - kod_jenis_permohonan
 *             properties:
 *               kod_jenis_permohonan:
 *                 type: string
 *                 maxLength: 2
 *               label_ms:
 *                 type: string
 *                 maxLength: 50
 *               label_en:
 *                 type: string
 *                 maxLength: 50
 *               tempoh_sah_permohonan:
 *                 type: integer
 *                 default: 0
 *               is_active:
 *                 type: boolean
 *               updated_by:
 *                 type: integer
 *     responses:
 *       "200":
 *         description: OK
 *       "404":
 *         description: Not found
 *   patch:
 *     summary: Update application type reference (partial update)
 *     tags: [RefJenisPermohonan]
 *     parameters:
 *       - in: path
 *         name: kod
 *         required: true
 *         schema:
 *           type: string
 *           maxLength: 2
 *         description: Application type code
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
 *               tempoh_sah_permohonan:
 *                 type: integer
 *               is_active:
 *                 type: boolean
 *     responses:
 *       "200":
 *         description: OK
 *       "404":
 *         description: Not found
 *   delete:
 *     summary: Delete application type reference
 *     tags: [RefJenisPermohonan]
 *     parameters:
 *       - in: path
 *         name: kod
 *         required: true
 *         schema:
 *           type: string
 *           maxLength: 2
 *         description: Application type code
 *     responses:
 *       "204":
 *         description: No content
 *       "404":
 *         description: Not found
 */
router
  .route('/:kod')
  .get(/*auth(),*/ validate(refJenisPermohonanValidation.getRefJenisPermohonan), refJenisPermohonanController.getRefJenisPermohonan)
  .put(/*auth(),*/ validate(refJenisPermohonanValidation.replaceRefJenisPermohonan), refJenisPermohonanController.replaceRefJenisPermohonan)
  .patch(/*auth(),*/ validate(refJenisPermohonanValidation.updateRefJenisPermohonan), refJenisPermohonanController.updateRefJenisPermohonan)
  .delete(/*auth(),*/ validate(refJenisPermohonanValidation.deleteRefJenisPermohonan), refJenisPermohonanController.deleteRefJenisPermohonan);

module.exports = router;