const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const refPoskodValidation = require('../../validations/refPoskod.validation');
const refPoskodController = require('../../controllers/refPoskod.controller');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     RefPoskod:
 *       type: object
 *       required:
 *         - bandar
 *         - daerah
 *         - kod_negeri
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated unique identifier
 *         poskod:
 *           type: string
 *           maxLength: 6
 *           description: 6-character postal code
 *         bandar:
 *           type: string
 *           maxLength: 50
 *           description: City name
 *         daerah:
 *           type: string
 *           maxLength: 50
 *           description: District name
 *         kod_negeri:
 *           type: string
 *           maxLength: 2
 *           description: State code
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
 *   name: RefPoskod
 *   description: Postal code reference management
 */

/**
 * @swagger
 * /ref-postal-codes:
 *   post:
 *     summary: Create a postal code reference
 *     tags: [RefPoskod]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RefPoskod'
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RefPoskod'
 *   get:
 *     summary: Get all postal codes
 *     tags: [RefPoskod]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: poskod
 *         schema:
 *           type: string
 *         description: Postal code
 *       - in: query
 *         name: bandar
 *         schema:
 *           type: string
 *         description: City name
 *       - in: query
 *         name: daerah
 *         schema:
 *           type: string
 *         description: District name
 *       - in: query
 *         name: kod_negeri
 *         schema:
 *           type: string
 *         description: State code
 *       - in: query
 *         name: is_active
 *         schema:
 *           type: boolean
 *         description: Active status
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of results
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/RefPoskod'
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 totalResults:
 *                   type: integer
 */
router
  .route('/')
  .post(/*auth(),*/ validate(refPoskodValidation.createPostalCode), refPoskodController.createPostalCode)
  .get(/*auth(),*/ validate(refPoskodValidation.getPostalCodes), refPoskodController.getPostalCodes);

/**
 * @swagger
 * /ref-postal-codes/active:
 *   get:
 *     summary: Get active postal codes
 *     tags: [RefPoskod]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RefPoskod'
 */
router.route('/active').get(/*auth(),*/ refPoskodController.getActivePostalCodes);

/**
 * @swagger
 * /ref-postal-codes/code/{code}:
 *   get:
 *     summary: Get postal code by code
 *     tags: [RefPoskod]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *           maxLength: 6
 *         description: Postal code
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RefPoskod'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
router.route('/code/:code').get(/*auth(),*/ validate(refPoskodValidation.getPostalCodeByCode), refPoskodController.getPostalCodeByCode);

/**
 * @swagger
 * /ref-postal-codes/state/{stateCode}:
 *   get:
 *     summary: Get postal codes by state
 *     tags: [RefPoskod]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: stateCode
 *         required: true
 *         schema:
 *           type: string
 *           maxLength: 2
 *         description: State code
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RefPoskod'
 */
router.route('/state/:stateCode').get(/*auth(),*/ validate(refPoskodValidation.getPostalCodesByState), refPoskodController.getPostalCodesByState);

/**
 * @swagger
 * /ref-postal-codes/{postalCodeId}:
 *   get:
 *     summary: Get a postal code
 *     tags: [RefPoskod]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postalCodeId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Postal code id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RefPoskod'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   patch:
 *     summary: Update a postal code
 *     tags: [RefPoskod]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postalCodeId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Postal code id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               poskod:
 *                 type: string
 *                 maxLength: 6
 *               bandar:
 *                 type: string
 *                 maxLength: 50
 *               daerah:
 *                 type: string
 *                 maxLength: 50
 *               kod_negeri:
 *                 type: string
 *                 maxLength: 2
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
 *               $ref: '#/components/schemas/RefPoskod'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   put:
 *     summary: Replace a postal code (full update)
 *     tags: [RefPoskod]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postalCodeId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Postal code id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bandar
 *               - daerah
 *               - kod_negeri
 *             properties:
 *               poskod:
 *                 type: string
 *                 maxLength: 6
 *               bandar:
 *                 type: string
 *                 maxLength: 50
 *               daerah:
 *                 type: string
 *                 maxLength: 50
 *               kod_negeri:
 *                 type: string
 *                 maxLength: 2
 *               is_active:
 *                 type: boolean
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RefPoskod'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   delete:
 *     summary: Delete a postal code
 *     tags: [RefPoskod]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postalCodeId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Postal code id
 *     responses:
 *       "204":
 *         description: No content
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
router
  .route('/:postalCodeId')
  .get(/*auth(),*/ validate(refPoskodValidation.getPostalCode), refPoskodController.getPostalCode)
  .patch(/*auth(),*/ validate(refPoskodValidation.updatePostalCode), refPoskodController.updatePostalCode)
  .put(/*auth(),*/ validate(refPoskodValidation.replacePostalCode), refPoskodController.replacePostalCode)
  .delete(/*auth(),*/ validate(refPoskodValidation.deletePostalCode), refPoskodController.deletePostalCode);

module.exports = router;