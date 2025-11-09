const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const refBahagianBadanValidation = require('../../validations/refBahagianBadan.validation');
const refBahagianBadanController = require('../../controllers/refBahagianBadan.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: RefBahagianBadan
 *   description: Body part reference management
 */

/**
 * @swagger
 * /ref_bahagian_badan:
 *   post:
 *     summary: Create body part reference
 *     tags: [RefBahagianBadan]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - kod_bahagian_badan
 *               - label_ms
 *             properties:
 *               kod_bahagian_badan:
 *                 type: string
 *                 maxLength: 4
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
 *     summary: Get all body part references
 *     tags: [RefBahagianBadan]
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
  .post(/*auth(),*/ validate(refBahagianBadanValidation.createRefBahagianBadan), refBahagianBadanController.createRefBahagianBadan)
  .get(/*auth(),*/ validate(refBahagianBadanValidation.getRefBahagianBadans), refBahagianBadanController.getRefBahagianBadans);

/**
 * @swagger
 * /ref_bahagian_badan/{id}:
 *   get:
 *     summary: Get body part reference by code
 *     tags: [RefBahagianBadan]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           maxLength: 4
 *         description: Body part code (kod_bahagian_badan)
 *     responses:
 *       "200":
 *         description: OK
 *       "404":
 *         description: Not found
 *   put:
 *     summary: Replace body part reference (full update)
 *     tags: [RefBahagianBadan]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           maxLength: 4
 *         description: Body part code (kod_bahagian_badan)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - kod_bahagian_badan
 *               - label_ms
 *             properties:
 *               kod_bahagian_badan:
 *                 type: string
 *                 maxLength: 4
 *               label_ms:
 *                 type: string
 *                 maxLength: 50
 *               label_en:
 *                 type: string
 *                 maxLength: 50
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
 *     summary: Update body part reference (partial update)
 *     tags: [RefBahagianBadan]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           maxLength: 4
 *         description: Body part code (kod_bahagian_badan)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               kod_bahagian_badan:
 *                 type: string
 *                 maxLength: 4
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
 *     summary: Delete body part reference
 *     tags: [RefBahagianBadan]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           maxLength: 4
 *         description: Body part code (kod_bahagian_badan)
 *     responses:
 *       "204":
 *         description: No content
 *       "404":
 *         description: Not found
 */
router
  .route('/:id')
  .get(/*auth(),*/ validate(refBahagianBadanValidation.getRefBahagianBadan), refBahagianBadanController.getRefBahagianBadan)
  .put(/*auth(),*/ validate(refBahagianBadanValidation.replaceRefBahagianBadan), refBahagianBadanController.replaceRefBahagianBadan)
  .patch(/*auth(),*/ validate(refBahagianBadanValidation.updateRefBahagianBadan), refBahagianBadanController.updateRefBahagianBadan)
  .delete(/*auth(),*/ validate(refBahagianBadanValidation.deleteRefBahagianBadan), refBahagianBadanController.deleteRefBahagianBadan);

module.exports = router;