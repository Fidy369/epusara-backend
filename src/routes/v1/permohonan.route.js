const express = require('express');
const validate = require('../../middlewares/validate');
const permohonanValidation = require('../../validations/permohonan.validation');
const permohonanController = require('../../controllers/permohonan.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(permohonanValidation.createPermohonan), permohonanController.createPermohonan)
  .get(validate(permohonanValidation.getPermohonans), permohonanController.getPermohonans);

router
  .route('/:permohonanId')
  .get(validate(permohonanValidation.getPermohonan), permohonanController.getPermohonan)
  .patch(validate(permohonanValidation.updatePermohonan), permohonanController.updatePermohonan)
  .delete(validate(permohonanValidation.deletePermohonan), permohonanController.deletePermohonan);

router
  .route('/:permohonanId/submit')
  .post(validate(permohonanValidation.submitPermohonan), permohonanController.submitPermohonan);

router
  .route('/:permohonanId/approve')
  .post(validate(permohonanValidation.approvePermohonan), permohonanController.approvePermohonan);

router
  .route('/:permohonanId/reject')
  .post(validate(permohonanValidation.rejectPermohonan), permohonanController.rejectPermohonan);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Permohonan
 *   description: Burial application management
 */

/**
 * @swagger
 * /permohonan:
 *   post:
 *     summary: Create a burial application
 *     tags: [Permohonan]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - kod_jenis_permohonan
 *               - ref_kategori_jenazah_id
 *             properties:
 *               kod_jenis_permohonan:
 *                 type: string
 *                 maxLength: 2
 *               ref_kategori_jenazah_id:
 *                 type: integer
 *               applicant:
 *                 type: object
 *                 properties:
 *                   nama_pemohon:
 *                     type: string
 *                   jenis_pengenalan:
 *                     type: string
 *                   no_pengenalan:
 *                     type: string
 *                   ref_hubungan_id:
 *                     type: integer
 *                   phone:
 *                     type: string
 *                   email:
 *                     type: string
 *                   address1:
 *                     type: string
 *                   poskod:
 *                     type: string
 *               deceased:
 *                 type: object
 *                 properties:
 *                   nama_jenazah:
 *                     type: string
 *                   kod_warganegara:
 *                     type: string
 *                   jenis_pengenalan:
 *                     type: string
 *                   no_pengenalan:
 *                     type: string
 *                   ref_bangsa_id:
 *                     type: integer
 *                   kod_jantina:
 *                     type: string
 *                   tarikh_lahir:
 *                     type: string
 *                     format: date
 *                   address1:
 *                     type: string
 *     responses:
 *       "201":
 *         description: Created
 *       "400":
 *         description: Bad Request
 *
 *   get:
 *     summary: Get all applications
 *     tags: [Permohonan]
 *     parameters:
 *       - in: query
 *         name: status_permohonan
 *         schema:
 *           type: string
 *         description: Application status
 *       - in: query
 *         name: kod_jenis_permohonan
 *         schema:
 *           type: string
 *         description: Application type code
 *       - in: query
 *         name: no_permohonan
 *         schema:
 *           type: string
 *         description: Application number
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. created_at:desc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of applications
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 */

/**
 * @swagger
 * /permohonan/{id}:
 *   get:
 *     summary: Get an application
 *     tags: [Permohonan]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Application id
 *     responses:
 *       "200":
 *         description: OK
 *       "404":
 *         description: Not found
 *
 *   patch:
 *     summary: Update an application
 *     tags: [Permohonan]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Application id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status_permohonan:
 *                 type: string
 *               ref_kategori_jenazah_id:
 *                 type: integer
 *     responses:
 *       "200":
 *         description: OK
 *       "404":
 *         description: Not found
 *
 *   delete:
 *     summary: Delete an application
 *     tags: [Permohonan]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Application id
 *     responses:
 *       "204":
 *         description: No content
 *       "404":
 *         description: Not found
 */

/**
 * @swagger
 * /permohonan/{id}/submit:
 *   post:
 *     summary: Submit an application
 *     tags: [Permohonan]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Application id
 *     responses:
 *       "200":
 *         description: OK
 *       "400":
 *         description: Bad Request
 *       "404":
 *         description: Not found
 */

/**
 * @swagger
 * /permohonan/{id}/approve:
 *   post:
 *     summary: Approve an application
 *     tags: [Permohonan]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Application id
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               notes:
 *                 type: string
 *     responses:
 *       "200":
 *         description: OK
 *       "404":
 *         description: Not found
 */

/**
 * @swagger
 * /permohonan/{id}/reject:
 *   post:
 *     summary: Reject an application
 *     tags: [Permohonan]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Application id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - notes
 *             properties:
 *               notes:
 *                 type: string
 *     responses:
 *       "200":
 *         description: OK
 *       "404":
 *         description: Not found
 */