const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const permohonanRunningNumberValidation = require('../../validations/permohonanRunningNumber.validation');
const permohonanRunningNumberController = require('../../controllers/permohonanRunningNumber.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Running Numbers
 *   description: Application running number management
 */

/**
 * @swagger
 * /running-numbers:
 *   post:
 *     summary: Create running number entry
 *     tags: [Running Numbers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - date
 *             properties:
 *               type:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               running_no:
 *                 type: integer
 *                 minimum: 0
 *     responses:
 *       "201":
 *         description: Created
 *   get:
 *     summary: Query running numbers
 *     tags: [Running Numbers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
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
  .post(auth('manageApplications'), validate(permohonanRunningNumberValidation.createRunningNumber), permohonanRunningNumberController.createRunningNumber)
  .get(auth('getApplications'), validate(permohonanRunningNumberValidation.queryRunningNumbers), permohonanRunningNumberController.queryRunningNumbers);

/**
 * @swagger
 * /running-numbers/{runningNumberId}:
 *   get:
 *     summary: Get running number
 *     tags: [Running Numbers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: runningNumberId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       "200":
 *         description: OK
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   delete:
 *     summary: Delete running number
 *     tags: [Running Numbers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: runningNumberId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       "204":
 *         description: No content
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
router
  .route('/:runningNumberId')
  .get(auth('getApplications'), validate(permohonanRunningNumberValidation.getRunningNumber), permohonanRunningNumberController.getRunningNumber)
  .delete(auth('manageApplications'), validate(permohonanRunningNumberValidation.deleteRunningNumber), permohonanRunningNumberController.deleteRunningNumber);

/**
 * @swagger
 * /running-numbers/{runningNumberId}/increment:
 *   patch:
 *     summary: Increment running number
 *     tags: [Running Numbers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: runningNumberId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       "200":
 *         description: OK
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
router
  .route('/:runningNumberId/increment')
  .patch(auth('manageApplications'), validate(permohonanRunningNumberValidation.incrementRunningNumber), permohonanRunningNumberController.incrementRunningNumber);

/**
 * @swagger
 * /running-numbers/{runningNumberId}/reset:
 *   patch:
 *     summary: Reset running number
 *     tags: [Running Numbers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: runningNumberId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newNumber:
 *                 type: integer
 *                 minimum: 0
 *     responses:
 *       "200":
 *         description: OK
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
router
  .route('/:runningNumberId/reset')
  .patch(auth('manageApplications'), validate(permohonanRunningNumberValidation.resetRunningNumber), permohonanRunningNumberController.resetRunningNumber);

/**
 * @swagger
 * /running-numbers/next/{type}:
 *   get:
 *     summary: Get next running number for type
 *     tags: [Running Numbers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 type:
 *                   type: string
 *                 date:
 *                   type: string
 *                   format: date
 *                 running_no:
 *                   type: integer
 */
router
  .route('/next/:type')
  .get(auth('manageApplications'), validate(permohonanRunningNumberValidation.getNextRunningNumber), permohonanRunningNumberController.getNextRunningNumber);

module.exports = router;