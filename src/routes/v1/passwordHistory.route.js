const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const passwordHistoryValidation = require('../../validations/passwordHistory.validation');
const passwordHistoryController = require('../../controllers/passwordHistory.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Password History
 *   description: Password history management
 */

/**
 * @swagger
 * /password-history:
 *   post:
 *     summary: Create password history entry
 *     tags: [Password History]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - selector
 *               - hashed_token
 *               - expires_at
 *             properties:
 *               user_id:
 *                 type: integer
 *               selector:
 *                 type: string
 *                 minLength: 12
 *                 maxLength: 12
 *               hashed_token:
 *                 type: string
 *                 minLength: 64
 *                 maxLength: 64
 *               expires_at:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       "201":
 *         description: Created
 *   get:
 *     summary: Query password history
 *     tags: [Password History]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: integer
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
  .post(auth('manageUsers'), validate(passwordHistoryValidation.createPasswordHistory), passwordHistoryController.createPasswordHistory)
  .get(auth('manageUsers'), validate(passwordHistoryValidation.queryPasswordHistory), passwordHistoryController.queryPasswordHistory);

/**
 * @swagger
 * /password-history/{historyId}:
 *   get:
 *     summary: Get password history entry
 *     tags: [Password History]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: historyId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       "200":
 *         description: OK
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   put:
 *     summary: Update password history entry
 *     tags: [Password History]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: historyId
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
 *               selector:
 *                 type: string
 *                 minLength: 12
 *                 maxLength: 12
 *               hashed_token:
 *                 type: string
 *                 minLength: 64
 *                 maxLength: 64
 *               expires_at:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       "200":
 *         description: OK
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   delete:
 *     summary: Delete password history entry
 *     tags: [Password History]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: historyId
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
  .route('/:historyId')
  .get(auth('manageUsers'), validate(passwordHistoryValidation.getPasswordHistory), passwordHistoryController.getPasswordHistory)
  .put(auth('manageUsers'), validate(passwordHistoryValidation.updatePasswordHistory), passwordHistoryController.updatePasswordHistory)
  .delete(auth('manageUsers'), validate(passwordHistoryValidation.deletePasswordHistory), passwordHistoryController.deletePasswordHistory);

/**
 * @swagger
 * /password-history/user/{userId}:
 *   get:
 *     summary: Get password history by user
 *     tags: [Password History]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 50
 *         default: 10
 *     responses:
 *       "200":
 *         description: OK
 */
router
  .route('/user/:userId')
  .get(auth('manageUsers'), validate(passwordHistoryValidation.getPasswordHistoryByUser), passwordHistoryController.getPasswordHistoryByUser);

/**
 * @swagger
 * /password-history/cleanup:
 *   delete:
 *     summary: Clean expired password history
 *     tags: [Password History]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 deleted_count:
 *                   type: integer
 */
router
  .route('/cleanup')
  .delete(auth('manageUsers'), passwordHistoryController.cleanExpiredHistory);

module.exports = router;