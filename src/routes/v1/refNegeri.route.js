const express = require('express');
const validate = require('../../middlewares/validate');
const refNegeriValidation = require('../../validations/refNegeri.validation');
const refNegeriController = require('../../controllers/refNegeri.controller');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     RefNegeri:
 *       type: object
 *       required:
 *         - kod_negeri
 *         - label
 *       properties:
 *         kod_negeri:
 *           type: string
 *           maxLength: 2
 *           description: State code (2 characters)
 *         label:
 *           type: string
 *           maxLength: 50
 *           description: State name
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
 *   name: RefNegeri
 *   description: Reference state management
 */

/**
 * @swagger
 * /ref_negeri:
 *   post:
 *     summary: Create a reference state
 *     tags: [RefNegeri]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RefNegeri'
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RefNegeri'
 *   get:
 *     summary: Get all reference states
 *     tags: [RefNegeri]
 *     parameters:
 *       - in: query
 *         name: kod_negeri
 *         schema:
 *           type: string
 *         description: State code
 *       - in: query
 *         name: label
 *         schema:
 *           type: string
 *         description: State name
 *       - in: query
 *         name: is_active
 *         schema:
 *           type: boolean
 *         description: Active status
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. label:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of states
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
 * /ref_negeri/{kod}:
 *   get:
 *     summary: Get a reference state
 *     tags: [RefNegeri]
 *     parameters:
 *       - in: path
 *         name: kod
 *         required: true
 *         schema:
 *           type: string
 *         description: State code
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RefNegeri'
 *       "404":
 *         description: Not found
 *   patch:
 *     summary: Update a reference state
 *     tags: [RefNegeri]
 *     parameters:
 *       - in: path
 *         name: kod
 *         required: true
 *         schema:
 *           type: string
 *         description: State code
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               label:
 *                 type: string
 *                 maxLength: 50
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
 *               $ref: '#/components/schemas/RefNegeri'
 *       "404":
 *         description: Not found
 *   delete:
 *     summary: Delete a reference state
 *     tags: [RefNegeri]
 *     parameters:
 *       - in: path
 *         name: kod
 *         required: true
 *         schema:
 *           type: string
 *         description: State code
 *     responses:
 *       "204":
 *         description: No content
 *       "404":
 *         description: Not found
 */

router
  .route('/')
  .post(validate(refNegeriValidation.createRefNegeri), refNegeriController.createRefNegeri)
  .get(validate(refNegeriValidation.getRefNegeris), refNegeriController.getRefNegeris);

router
  .route('/:kod')
  .get(validate(refNegeriValidation.getRefNegeri), refNegeriController.getRefNegeri)
  .patch(validate(refNegeriValidation.updateRefNegeri), refNegeriController.updateRefNegeri)
  .delete(validate(refNegeriValidation.deleteRefNegeri), refNegeriController.deleteRefNegeri);

module.exports = router;