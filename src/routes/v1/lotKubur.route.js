const express = require('express');
const validate = require('../../middlewares/validate');
const lotKuburValidation = require('../../validations/lotKubur.validation');
const lotKuburController = require('../../controllers/lotKubur.controller');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     LotKubur:
 *       type: object
 *       required:
 *         - tapak_perkuburan_id
 *         - zon_id
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated unique identifier
 *         tapak_perkuburan_id:
 *           type: integer
 *           description: Cemetery site ID
 *         zon_id:
 *           type: integer
 *           description: Cemetery zone ID
 *         kod_kategori_jenazah:
 *           type: string
 *           maxLength: 4
 *           description: Corpse category code
 *         kategori_jenazah_id:
 *           type: integer
 *           description: Corpse category ID
 *         no_lot:
 *           type: string
 *           maxLength: 50
 *           description: Lot number
 *         kod_status_kubur:
 *           type: string
 *           maxLength: 2
 *           default: AV
 *           description: Grave status code
 *         gis_id:
 *           type: integer
 *           description: GIS system ID
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
 *   name: LotKubur
 *   description: Burial lot management
 */

/**
 * @swagger
 * /lot-kubur:
 *   post:
 *     summary: Create a burial lot
 *     tags: [LotKubur]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LotKubur'
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LotKubur'
 *   get:
 *     summary: Get all burial lots
 *     tags: [LotKubur]
 *     parameters:
 *       - in: query
 *         name: tapak_perkuburan_id
 *         schema:
 *           type: integer
 *         description: Cemetery site ID
 *       - in: query
 *         name: zon_id
 *         schema:
 *           type: integer
 *         description: Cemetery zone ID
 *       - in: query
 *         name: kod_kategori_jenazah
 *         schema:
 *           type: string
 *         description: Corpse category code
 *       - in: query
 *         name: kod_status_kubur
 *         schema:
 *           type: string
 *         description: Grave status code
 *       - in: query
 *         name: no_lot
 *         schema:
 *           type: string
 *         description: Lot number
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
 *         description: Maximum number of lots
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
 * /lot-kubur/{id}:
 *   get:
 *     summary: Get a burial lot
 *     tags: [LotKubur]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Burial lot ID
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LotKubur'
 *       "404":
 *         description: Not found
 *   patch:
 *     summary: Update a burial lot
 *     tags: [LotKubur]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Burial lot ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tapak_perkuburan_id:
 *                 type: integer
 *               zon_id:
 *                 type: integer
 *               kod_kategori_jenazah:
 *                 type: string
 *                 maxLength: 4
 *               kategori_jenazah_id:
 *                 type: integer
 *               no_lot:
 *                 type: string
 *                 maxLength: 50
 *               kod_status_kubur:
 *                 type: string
 *                 maxLength: 2
 *               gis_id:
 *                 type: integer
 *               updated_by:
 *                 type: integer
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LotKubur'
 *       "404":
 *         description: Not found
 *   delete:
 *     summary: Delete a burial lot
 *     tags: [LotKubur]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Burial lot ID
 *     responses:
 *       "204":
 *         description: No content
 *       "404":
 *         description: Not found
 */

router
  .route('/')
  .post(validate(lotKuburValidation.createLotKubur), lotKuburController.createLotKubur)
  .get(validate(lotKuburValidation.getLotKuburs), lotKuburController.getLotKuburs);

router
  .route('/:id')
  .get(validate(lotKuburValidation.getLotKubur), lotKuburController.getLotKubur)
  .patch(validate(lotKuburValidation.updateLotKubur), lotKuburController.updateLotKubur)
  .delete(validate(lotKuburValidation.deleteLotKubur), lotKuburController.deleteLotKubur);

module.exports = router;