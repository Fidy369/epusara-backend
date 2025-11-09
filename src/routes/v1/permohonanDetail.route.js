const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const permohonanDetailValidation = require('../../validations/permohonanDetail.validation');
const permohonanDetailController = require('../../controllers/permohonanDetail.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: PermohonanDetail
 *   description: Permohonan detail management
 */

/**
 * @swagger
 * /application-details:
 *   post:
 *     summary: Create application detail
 *     tags: [PermohonanDetail]
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
 *               - masa_dipilih_pemohon
 *             properties:
 *               permohonan_id:
 *                 type: integer
 *               tapak_perkuburan_id:
 *                 type: integer
 *               status_permohonan:
 *                 type: string
 *                 enum: [DL, DT, DB, DP, DF]
 *               status_pengebumian:
 *                 type: string
 *                 enum: [SS, BS]
 *               masa_dipilih_pemohon:
 *                 type: string
 *                 format: date-time
 *               masa_ditetapkan_pegawai:
 *                 type: string
 *                 format: date-time
 *               masa_selesai_pengebumian:
 *                 type: string
 *                 format: date-time
 *               is_in_kawasan_mbjb:
 *                 type: boolean
 *               lot_id:
 *                 type: integer
 *     responses:
 *       "201":
 *         description: Created
 *   get:
 *     summary: Query application details
 *     tags: [PermohonanDetail]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: permohonan_id
 *         schema:
 *           type: integer
 *       - in: query
 *         name: tapak_perkuburan_id
 *         schema:
 *           type: integer
 *       - in: query
 *         name: status_permohonan
 *         schema:
 *           type: string
 *           enum: [DL, DT, DB, DP, DF]
 *       - in: query
 *         name: status_pengebumian
 *         schema:
 *           type: string
 *           enum: [SS, BS]
 *       - in: query
 *         name: is_in_kawasan_mbjb
 *         schema:
 *           type: string
 *           enum: [true, false]
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
  .post(auth('manageApplications'), validate(permohonanDetailValidation.createPermohonanDetail), permohonanDetailController.createPermohonanDetail)
  .get(auth('getApplications'), validate(permohonanDetailValidation.queryPermohonanDetails), permohonanDetailController.queryPermohonanDetails);

/**
 * @swagger
 * /application-details/{detailId}:
 *   get:
 *     summary: Get application detail
 *     tags: [PermohonanDetail]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: detailId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       "200":
 *         description: OK
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   put:
 *     summary: Replace application detail (full update)
 *     tags: [PermohonanDetail]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: detailId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - permohonan_id
 *               - masa_dipilih_pemohon
 *             properties:
 *               permohonan_id:
 *                 type: integer
 *               tapak_perkuburan_id:
 *                 type: integer
 *               status_permohonan:
 *                 type: string
 *                 enum: [DL, DT, DB, DP, DF]
 *               status_pengebumian:
 *                 type: string
 *                 enum: [SS, BS]
 *               masa_dipilih_pemohon:
 *                 type: string
 *                 format: date-time
 *               masa_ditetapkan_pegawai:
 *                 type: string
 *                 format: date-time
 *               masa_selesai_pengebumian:
 *                 type: string
 *                 format: date-time
 *               is_in_kawasan_mbjb:
 *                 type: boolean
 *               lot_id:
 *                 type: integer
 *     responses:
 *       "200":
 *         description: OK
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   patch:
 *     summary: Update application detail (partial update)
 *     tags: [PermohonanDetail]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: detailId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tapak_perkuburan_id:
 *                 type: integer
 *               status_permohonan:
 *                 type: string
 *                 enum: [DL, DT, DB, DP, DF]
 *               status_pengebumian:
 *                 type: string
 *                 enum: [SS, BS]
 *               masa_dipilih_pemohon:
 *                 type: string
 *                 format: date-time
 *               masa_ditetapkan_pegawai:
 *                 type: string
 *                 format: date-time
 *               masa_selesai_pengebumian:
 *                 type: string
 *                 format: date-time
 *               is_in_kawasan_mbjb:
 *                 type: boolean
 *               lot_id:
 *                 type: integer
 *     responses:
 *       "200":
 *         description: OK
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   delete:
 *     summary: Delete application detail
 *     tags: [PermohonanDetail]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: detailId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       "204":
 *         description: No content
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
router
  .route('/:detailId')
  .get(auth('getApplications'), validate(permohonanDetailValidation.getPermohonanDetail), permohonanDetailController.getPermohonanDetail)
  .put(auth('manageApplications'), validate(permohonanDetailValidation.replacePermohonanDetail), permohonanDetailController.replacePermohonanDetail)
  .patch(auth('manageApplications'), validate(permohonanDetailValidation.updatePermohonanDetail), permohonanDetailController.updatePermohonanDetail)
  .delete(auth('manageApplications'), validate(permohonanDetailValidation.deletePermohonanDetail), permohonanDetailController.deletePermohonanDetail);

/**
 * @swagger
 * /application-details/application/{permohonanId}:
 *   get:
 *     summary: Get application detail by application ID
 *     tags: [PermohonanDetail]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: permohonanId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       "200":
 *         description: OK
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
router
  .route('/application/:permohonanId')
  .get(auth('getApplications'), validate(permohonanDetailValidation.getPermohonanDetailByPermohonanId), permohonanDetailController.getPermohonanDetailByPermohonanId);

module.exports = router;