const express = require('express');
const validate = require('../../middlewares/validate');
const zonTapakPerkuburanValidation = require('../../validations/zonTapakPerkuburan.validation');
const zonTapakPerkuburanController = require('../../controllers/zonTapakPerkuburan.controller');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     ZonTapakPerkuburan:
 *       type: object
 *       required:
 *         - tapak_perkuburan_id
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated unique identifier
 *         tapak_perkuburan_id:
 *           type: integer
 *           description: Cemetery site ID
 *         nama_zon:
 *           type: string
 *           maxLength: 255
 *           description: Zone name
 *         ref_kategori_jenazah_kod:
 *           type: string
 *           maxLength: 4
 *           description: Corpse category code
 *         ref_kategori_jenazah_id:
 *           type: integer
 *           description: Corpse category ID
 *         keluasan_zon:
 *           type: number
 *           format: decimal
 *           description: Zone area in decimal format
 *         kapasiti_lot_keseluruhan:
 *           type: integer
 *           description: Total lot capacity
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
 *   name: ZonTapakPerkuburan
 *   description: Cemetery zone management
 */

/**
 * @swagger
 * /zon-tapak-perkuburan:
 *   post:
 *     summary: Create a cemetery zone
 *     tags: [ZonTapakPerkuburan]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ZonTapakPerkuburan'
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ZonTapakPerkuburan'
 *   get:
 *     summary: Get all cemetery zones
 *     tags: [ZonTapakPerkuburan]
 *     parameters:
 *       - in: query
 *         name: tapak_perkuburan_id
 *         schema:
 *           type: integer
 *         description: Cemetery site ID
 *       - in: query
 *         name: nama_zon
 *         schema:
 *           type: string
 *         description: Zone name
 *       - in: query
 *         name: ref_kategori_jenazah_id
 *         schema:
 *           type: integer
 *         description: Corpse category ID
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
 *         description: Maximum number of zones
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
 * /zon-tapak-perkuburan/{id}:
 *   get:
 *     summary: Get a cemetery zone
 *     tags: [ZonTapakPerkuburan]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Cemetery zone ID
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ZonTapakPerkuburan'
 *       "404":
 *         description: Not found
 *   patch:
 *     summary: Update a cemetery zone
 *     tags: [ZonTapakPerkuburan]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Cemetery zone ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tapak_perkuburan_id:
 *                 type: integer
 *               nama_zon:
 *                 type: string
 *                 maxLength: 255
 *               ref_kategori_jenazah_kod:
 *                 type: string
 *                 maxLength: 4
 *               ref_kategori_jenazah_id:
 *                 type: integer
 *               keluasan_zon:
 *                 type: number
 *                 format: decimal
 *               kapasiti_lot_keseluruhan:
 *                 type: integer
 *               updated_by:
 *                 type: integer
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ZonTapakPerkuburan'
 *       "404":
 *         description: Not found
 *   delete:
 *     summary: Delete a cemetery zone
 *     tags: [ZonTapakPerkuburan]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Cemetery zone ID
 *     responses:
 *       "204":
 *         description: No content
 *       "404":
 *         description: Not found
 */

router
  .route('/')
  .post(validate(zonTapakPerkuburanValidation.createZonTapakPerkuburan), zonTapakPerkuburanController.createZonTapakPerkuburan)
  .get(validate(zonTapakPerkuburanValidation.getZonTapakPerkuburans), zonTapakPerkuburanController.getZonTapakPerkuburans);

router
  .route('/:id')
  .get(validate(zonTapakPerkuburanValidation.getZonTapakPerkuburan), zonTapakPerkuburanController.getZonTapakPerkuburan)
  .patch(validate(zonTapakPerkuburanValidation.updateZonTapakPerkuburan), zonTapakPerkuburanController.updateZonTapakPerkuburan)
  .delete(validate(zonTapakPerkuburanValidation.deleteZonTapakPerkuburan), zonTapakPerkuburanController.deleteZonTapakPerkuburan);

module.exports = router;