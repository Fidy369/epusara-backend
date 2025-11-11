const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const passwordResetValidation = require('../../validations/passwordReset.validation');
const passwordResetController = require('../../controllers/passwordReset.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Password Resets
 *   description: Password reset management
 */

/**
 * @swagger
 * /password-resets:
 *   post:
 *     summary: Create password reset entry
 *     tags: [Password Resets]
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
 *               - password
 *             properties:
 *               user_id:
 *                 type: integer
 *               password:
 *                 type: string
 *               created_by:
 *                 type: integer
 *     responses:
 *       "201":
 *         description: Created
 *   get:
 *     summary: Query password resets
 *     tags: [Password Resets]
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
  .post(auth('manageUsers'), validate(passwordResetValidation.createPasswordReset), passwordResetController.createPasswordReset)
  .get(auth('manageUsers'), validate(passwordResetValidation.queryPasswordResets), passwordResetController.queryPasswordResets);

/**
 * @swagger
 * /password-resets/{resetId}:
 *   get:
 *     summary: Get password reset entry
 *     tags: [Password Resets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: resetId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       "200":
 *         description: OK
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   delete:
 *     summary: Delete password reset entry
 *     tags: [Password Resets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: resetId
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
  .route('/:resetId')
  .get(auth('manageUsers'), validate(passwordResetValidation.getPasswordReset), passwordResetController.getPasswordReset)
  .delete(auth('manageUsers'), validate(passwordResetValidation.deletePasswordReset), passwordResetController.deletePasswordReset);

/**
 * @swagger
 * /password-resets/user/{userId}:
 *   get:
 *     summary: Get password reset by user
 *     tags: [Password Resets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       "200":
 *         description: OK
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   delete:
 *     summary: Delete all password resets for user
 *     tags: [Password Resets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
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
  .route('/user/:userId')
  .get(auth('manageUsers'), validate(passwordResetValidation.getPasswordResetByUser), passwordResetController.getPasswordResetByUser)
  .delete(auth('manageUsers'), validate(passwordResetValidation.deletePasswordResetsByUser), passwordResetController.deletePasswordResetsByUser);

module.exports = router;