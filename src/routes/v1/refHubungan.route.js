const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const refHubunganValidation = require('../../validations/refHubungan.validation');
const refHubunganController = require('../../controllers/refHubungan.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: RefHubungan
 *   description: Relationship reference management
 */

/**
 * @swagger
 * /ref_hubungan:
 *   post:
 *     summary: Create relationship reference
 *     tags: [RefHubungan]
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
 *               is_active:
 *                 type: boolean
 *     responses:
 *       "201":
 *         description: Created
 *   get:
 *     summary: Get all relationship references
 *     tags: [RefHubungan]
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
  .post(/*auth(),*/ validate(refHubunganValidation.createRefHubungan), refHubunganController.createRefHubungan)
  .get(/*auth(),*/ validate(refHubunganValidation.getRefHubungans), refHubunganController.getRefHubungans);

/**
 * @swagger
 * /ref_hubungan/{id}:
 *   get:
 *     summary: Get relationship reference by ID
 *     tags: [RefHubungan]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Relationship ID
 *     responses:
 *       "200":
 *         description: OK
 *       "404":
 *         description: Not found
 *   patch:
 *     summary: Update relationship reference
 *     tags: [RefHubungan]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Relationship ID
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
 *               is_active:
 *                 type: boolean
 *     responses:
 *       "200":
 *         description: OK
 *       "404":
 *         description: Not found
 *   delete:
 *     summary: Delete relationship reference
 *     tags: [RefHubungan]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Relationship ID
 *     responses:
 *       "204":
 *         description: No content
 *       "404":
 *         description: Not found
 */
router
  .route('/:id')
  .get(/*auth(),*/ validate(refHubunganValidation.getRefHubungan), refHubunganController.getRefHubungan)
  .patch(/*auth(),*/ validate(refHubunganValidation.updateRefHubungan), refHubunganController.updateRefHubungan)
  .delete(/*auth(),*/ validate(refHubunganValidation.deleteRefHubungan), refHubunganController.deleteRefHubungan);

module.exports = router;