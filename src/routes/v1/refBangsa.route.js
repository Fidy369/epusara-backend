const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const refBangsaValidation = require('../../validations/refBangsa.validation');
const refBangsaController = require('../../controllers/refBangsa.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: RefBangsa
 *   description: Race reference management
 */

/**
 * @swagger
 * /ref_bangsa:
 *   post:
 *     summary: Create race reference
 *     tags: [RefBangsa]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - kod_bangsa
 *               - label_ms
 *               - label_en
 *             properties:
 *               kod_bangsa:
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
 *     summary: Get all race references
 *     tags: [RefBangsa]
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
  .post(/*auth(),*/ validate(refBangsaValidation.createRefBangsa), refBangsaController.createRefBangsa)
  .get(/*auth(),*/ validate(refBangsaValidation.getRefBangsas), refBangsaController.getRefBangsas);

/**
 * @swagger
 * /ref_bangsa/{id}:
 *   get:
 *     summary: Get race reference by ID
 *     tags: [RefBangsa]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Race ID
 *     responses:
 *       "200":
 *         description: OK
 *       "404":
 *         description: Not found
 *   put:
 *     summary: Replace race reference (full update)
 *     tags: [RefBangsa]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Race ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - kod_bangsa
 *               - label_ms
 *               - label_en
 *             properties:
 *               kod_bangsa:
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
 *   patch:
 *     summary: Update race reference (partial update)
 *     tags: [RefBangsa]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Race ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               kod_bangsa:
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
 *     summary: Delete race reference
 *     tags: [RefBangsa]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Race ID
 *     responses:
 *       "204":
 *         description: No content
 *       "404":
 *         description: Not found
 */
router
  .route('/:id')
  .get(/*auth(),*/ validate(refBangsaValidation.getRefBangsa), refBangsaController.getRefBangsa)
  .put(/*auth(),*/ validate(refBangsaValidation.replaceRefBangsa), refBangsaController.replaceRefBangsa)
  .patch(/*auth(),*/ validate(refBangsaValidation.updateRefBangsa), refBangsaController.updateRefBangsa)
  .delete(/*auth(),*/ validate(refBangsaValidation.deleteRefBangsa), refBangsaController.deleteRefBangsa);

module.exports = router;