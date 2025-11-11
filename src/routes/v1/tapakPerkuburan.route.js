const express = require('express');
const validate = require('../../middlewares/validate');
const tapakPerkuburanValidation = require('../../validations/tapakPerkuburan.validation');
const tapakPerkuburanController = require('../../controllers/tapakPerkuburan.controller');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     TapakPerkuburan:
 *       type: object
 *       required:
 *         - nama_tapak
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated unique identifier
 *         nama_tapak:
 *           type: string
 *           maxLength: 100
 *           description: Cemetery site name
 *         lokasi_tapak:
 *           type: string
 *           maxLength: 255
 *           description: Cemetery site location
 *         keluasan_tapak:
 *           type: number
 *           format: decimal
 *           description: Site area in decimal format
 *         kapasiti_lot_keseluruhan:
 *           type: integer
 *           description: Total lot capacity
 *         description:
 *           type: string
 *           maxLength: 255
 *           description: Site description
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
 *   name: TapakPerkuburan
 *   description: Cemetery site management
 */

/**
 * @swagger
 * /tapak-perkuburan:
 *   post:
 *     summary: Create a cemetery site
 *     tags: [TapakPerkuburan]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TapakPerkuburan'
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TapakPerkuburan'
 *   get:
 *     summary: Get all cemetery sites
 *     tags: [TapakPerkuburan]
 *     parameters:
 *       - in: query
 *         name: nama_tapak
 *         schema:
 *           type: string
 *         description: Cemetery site name
 *       - in: query
 *         name: lokasi_tapak
 *         schema:
 *           type: string
 *         description: Cemetery site location
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
 *         description: Maximum number of sites
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
 * /tapak-perkuburan/{id}:
 *   get:
 *     summary: Get a cemetery site
 *     tags: [TapakPerkuburan]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Cemetery site ID
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TapakPerkuburan'
 *       "404":
 *         description: Not found
 *   patch:
 *     summary: Update a cemetery site
 *     tags: [TapakPerkuburan]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Cemetery site ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nama_tapak:
 *                 type: string
 *                 maxLength: 100
 *               lokasi_tapak:
 *                 type: string
 *                 maxLength: 255
 *               keluasan_tapak:
 *                 type: number
 *                 format: decimal
 *               kapasiti_lot_keseluruhan:
 *                 type: integer
 *               description:
 *                 type: string
 *                 maxLength: 255
 *               updated_by:
 *                 type: integer
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TapakPerkuburan'
 *       "404":
 *         description: Not found
 *   delete:
 *     summary: Delete a cemetery site
 *     tags: [TapakPerkuburan]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Cemetery site ID
 *     responses:
 *       "204":
 *         description: No content
 *       "404":
 *         description: Not found
 */

router
  .route('/')
  .post(validate(tapakPerkuburanValidation.createTapakPerkuburan), tapakPerkuburanController.createTapakPerkuburan)
  .get(validate(tapakPerkuburanValidation.getTapakPerkuburans), tapakPerkuburanController.getTapakPerkuburans);

router
  .route('/:id')
  .get(validate(tapakPerkuburanValidation.getTapakPerkuburan), tapakPerkuburanController.getTapakPerkuburan)
  .patch(validate(tapakPerkuburanValidation.updateTapakPerkuburan), tapakPerkuburanController.updateTapakPerkuburan)
  .delete(validate(tapakPerkuburanValidation.deleteTapakPerkuburan), tapakPerkuburanController.deleteTapakPerkuburan);

module.exports = router;