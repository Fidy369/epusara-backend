const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const refNegaraValidation = require('../../validations/refNegara.validation');
const refNegaraController = require('../../controllers/refNegara.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: RefNegara
 *   description: Country reference management
 */

/**
 * @swagger
 * /ref_negara:
 *   post:
 *     summary: Create country reference
 *     tags: [RefNegara]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - kod_negara
 *               - label_ms
 *               - label_en
 *             properties:
 *               kod_negara:
 *                 type: string
 *                 maxLength: 2
 *               label_ms:
 *                 type: string
 *                 maxLength: 150
 *               label_en:
 *                 type: string
 *                 maxLength: 150
 *               is_active:
 *                 type: boolean
 *                 default: false
 *     responses:
 *       "201":
 *         description: Created
 *   get:
 *     summary: Get all country references
 *     tags: [RefNegara]
 *     parameters:
 *       - in: query
 *         name: kod_negara
 *         schema:
 *           type: string
 *           maxLength: 2
 *       - in: query
 *         name: label_ms
 *         schema:
 *           type: string
 *       - in: query
 *         name: label_en
 *         schema:
 *           type: string
 *       - in: query
 *         name: is_active
 *         schema:
 *           type: boolean
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
  .post(/*auth(),*/ validate(refNegaraValidation.createRefNegara), refNegaraController.createRefNegara)
  .get(/*auth(),*/ validate(refNegaraValidation.getRefNegaras), refNegaraController.getRefNegaras);

/**
 * @swagger
 * /ref_negara/{kod}:
 *   get:
 *     summary: Get country reference by code
 *     tags: [RefNegara]
 *     parameters:
 *       - in: path
 *         name: kod
 *         required: true
 *         schema:
 *           type: string
 *           maxLength: 2
 *         description: Country code (ISO 2-letter)
 *     responses:
 *       "200":
 *         description: OK
 *       "404":
 *         description: Not found
 *   patch:
 *     summary: Update country reference
 *     tags: [RefNegara]
 *     parameters:
 *       - in: path
 *         name: kod
 *         required: true
 *         schema:
 *           type: string
 *           maxLength: 2
 *         description: Country code (ISO 2-letter)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               label_ms:
 *                 type: string
 *                 maxLength: 150
 *               label_en:
 *                 type: string
 *                 maxLength: 150
 *               is_active:
 *                 type: boolean
 *     responses:
 *       "200":
 *         description: OK
 *       "404":
 *         description: Not found
 *   put:
 *     summary: Replace country reference (full update)
 *     tags: [RefNegara]
 *     parameters:
 *       - in: path
 *         name: kod
 *         required: true
 *         schema:
 *           type: string
 *           maxLength: 2
 *         description: Country code (ISO 2-letter)
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
 *                 maxLength: 150
 *               label_en:
 *                 type: string
 *                 maxLength: 150
 *               is_active:
 *                 type: boolean
 *                 default: false
 *     responses:
 *       "200":
 *         description: OK
 *       "404":
 *         description: Not found
 *   delete:
 *     summary: Delete country reference
 *     tags: [RefNegara]
 *     parameters:
 *       - in: path
 *         name: kod
 *         required: true
 *         schema:
 *           type: string
 *           maxLength: 2
 *         description: Country code (ISO 2-letter)
 *     responses:
 *       "204":
 *         description: No content
 *       "404":
 *         description: Not found
 */
router
  .route('/:kod')
  .get(/*auth(),*/ validate(refNegaraValidation.getRefNegara), refNegaraController.getRefNegara)
  .patch(/*auth(),*/ validate(refNegaraValidation.updateRefNegara), refNegaraController.updateRefNegara)
  .put(/*auth(),*/ validate(refNegaraValidation.replaceRefNegara), refNegaraController.replaceRefNegara)
  .delete(/*auth(),*/ validate(refNegaraValidation.deleteRefNegara), refNegaraController.deleteRefNegara);

module.exports = router;