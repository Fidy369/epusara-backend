const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const refJenisHaiwanValidation = require('../../validations/refJenisHaiwan.validation');
const refJenisHaiwanController = require('../../controllers/refJenisHaiwan.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: RefJenisHaiwan
 *   description: Animal type reference management
 */

/**
 * @swagger
 * /ref_jenis_haiwan:
 *   post:
 *     summary: Create animal type reference
 *     tags: [RefJenisHaiwan]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - kod_jenis_haiwan
 *               - label_ms
 *               - label_en
 *               - is_active
 *             properties:
 *               id:
 *                 type: integer
 *               kod_jenis_haiwan:
 *                 type: string
 *                 maxLength: 4
 *               label_ms:
 *                 type: string
 *                 maxLength: 50
 *               label_en:
 *                 type: string
 *                 maxLength: 50
 *               is_active:
 *                 type: integer
 *                 enum: [0, 1]
 *     responses:
 *       "201":
 *         description: Created
 *   get:
 *     summary: Get all animal type references
 *     tags: [RefJenisHaiwan]
 *     parameters:
 *       - in: query
 *         name: is_active
 *         schema:
 *           type: integer
 *           enum: [0, 1]
 *       - in: query
 *         name: kod_jenis_haiwan
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
  .post(/*auth(),*/ validate(refJenisHaiwanValidation.createRefJenisHaiwan), refJenisHaiwanController.createRefJenisHaiwan)
  .get(/*auth(),*/ validate(refJenisHaiwanValidation.getRefJenisHaiwans), refJenisHaiwanController.getRefJenisHaiwans);

/**
 * @swagger
 * /ref_jenis_haiwan/{id}:
 *   get:
 *     summary: Get animal type reference by ID
 *     tags: [RefJenisHaiwan]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Animal type ID
 *     responses:
 *       "200":
 *         description: OK
 *       "404":
 *         description: Not found
 *   patch:
 *     summary: Update animal type reference
 *     tags: [RefJenisHaiwan]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Animal type ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               kod_jenis_haiwan:
 *                 type: string
 *                 maxLength: 4
 *               label_ms:
 *                 type: string
 *                 maxLength: 50
 *               label_en:
 *                 type: string
 *                 maxLength: 50
 *               is_active:
 *                 type: integer
 *                 enum: [0, 1]
 *     responses:
 *       "200":
 *         description: OK
 *       "404":
 *         description: Not found
 *   delete:
 *     summary: Delete animal type reference
 *     tags: [RefJenisHaiwan]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Animal type ID
 *     responses:
 *       "204":
 *         description: No content
 *       "404":
 *         description: Not found
 */
router
  .route('/:id')
  .get(/*auth(),*/ validate(refJenisHaiwanValidation.getRefJenisHaiwan), refJenisHaiwanController.getRefJenisHaiwan)
  .patch(/*auth(),*/ validate(refJenisHaiwanValidation.updateRefJenisHaiwan), refJenisHaiwanController.updateRefJenisHaiwan)
  .delete(/*auth(),*/ validate(refJenisHaiwanValidation.deleteRefJenisHaiwan), refJenisHaiwanController.deleteRefJenisHaiwan);

module.exports = router;