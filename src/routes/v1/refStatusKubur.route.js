const express = require('express');
const validate = require('../../middlewares/validate');
const refStatusKuburValidation = require('../../validations/refStatusKubur.validation');
const refStatusKuburController = require('../../controllers/refStatusKubur.controller');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     RefStatusKubur:
 *       type: object
 *       required:
 *         - kod_status_kubur
 *         - label_ms
 *         - label_en
 *         - color
 *       properties:
 *         kod_status_kubur:
 *           type: string
 *           maxLength: 2
 *           description: Grave status code (2 characters)
 *         label_ms:
 *           type: string
 *           maxLength: 50
 *           description: Status label in Malay
 *         label_en:
 *           type: string
 *           maxLength: 50
 *           description: Status label in English
 *         color:
 *           type: string
 *           maxLength: 7
 *           description: Color code for status visualization
 *         is_active:
 *           type: boolean
 *           description: Active status
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
 *   name: RefStatusKubur
 *   description: Reference grave status management
 */

/**
 * @swagger
 * /ref_status_kubur:
 *   post:
 *     summary: Create a reference grave status
 *     tags: [RefStatusKubur]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RefStatusKubur'
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RefStatusKubur'
 *   get:
 *     summary: Get all reference grave statuses
 *     tags: [RefStatusKubur]
 *     parameters:
 *       - in: query
 *         name: kod_status_kubur
 *         schema:
 *           type: string
 *         description: Grave status code
 *       - in: query
 *         name: label_ms
 *         schema:
 *           type: string
 *         description: Status label in Malay
 *       - in: query
 *         name: label_en
 *         schema:
 *           type: string
 *         description: Status label in English
 *       - in: query
 *         name: is_active
 *         schema:
 *           type: boolean
 *         description: Active status
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. label_ms:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of statuses
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
 * /ref_status_kubur/{kod}:
 *   get:
 *     summary: Get a reference grave status
 *     tags: [RefStatusKubur]
 *     parameters:
 *       - in: path
 *         name: kod
 *         required: true
 *         schema:
 *           type: string
 *         description: Grave status code
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RefStatusKubur'
 *       "404":
 *         description: Not found
 *   patch:
 *     summary: Update a reference grave status
 *     tags: [RefStatusKubur]
 *     parameters:
 *       - in: path
 *         name: kod
 *         required: true
 *         schema:
 *           type: string
 *         description: Grave status code
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
 *               color:
 *                 type: string
 *                 maxLength: 7
 *               is_active:
 *                 type: boolean
 *               updated_by:
 *                 type: integer
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RefStatusKubur'
 *       "404":
 *         description: Not found
 *   put:
 *     summary: Replace a reference grave status
 *     tags: [RefStatusKubur]
 *     parameters:
 *       - in: path
 *         name: kod
 *         required: true
 *         schema:
 *           type: string
 *         description: Grave status code
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - label_ms
 *               - label_en
 *               - color
 *             properties:
 *               label_ms:
 *                 type: string
 *                 maxLength: 50
 *               label_en:
 *                 type: string
 *                 maxLength: 50
 *               color:
 *                 type: string
 *                 maxLength: 7
 *               is_active:
 *                 type: boolean
 *               updated_by:
 *                 type: integer
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RefStatusKubur'
 *       "404":
 *         description: Not found
 *   delete:
 *     summary: Delete a reference grave status
 *     tags: [RefStatusKubur]
 *     parameters:
 *       - in: path
 *         name: kod
 *         required: true
 *         schema:
 *           type: string
 *         description: Grave status code
 *     responses:
 *       "204":
 *         description: No content
 *       "404":
 *         description: Not found
 */

router
  .route('/')
  .post(validate(refStatusKuburValidation.createRefStatusKubur), refStatusKuburController.createRefStatusKubur)
  .get(validate(refStatusKuburValidation.getRefStatusKuburs), refStatusKuburController.getRefStatusKuburs);

router
  .route('/:kod')
  .get(validate(refStatusKuburValidation.getRefStatusKubur), refStatusKuburController.getRefStatusKubur)
  .patch(validate(refStatusKuburValidation.updateRefStatusKubur), refStatusKuburController.updateRefStatusKubur)
  .put(validate(refStatusKuburValidation.replaceRefStatusKubur), refStatusKuburController.replaceRefStatusKubur)
  .delete(validate(refStatusKuburValidation.deleteRefStatusKubur), refStatusKuburController.deleteRefStatusKubur);

module.exports = router;