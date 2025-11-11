const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userTokenValidation = require('../../validations/userToken.validation');
const userTokenController = require('../../controllers/userToken.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User Tokens
 *   description: User token management
 */

/**
 * @swagger
 * /user-tokens:
 *   post:
 *     summary: Create user token
 *     tags: [User Tokens]
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
 *               - hashed_validator
 *               - expires
 *             properties:
 *               user_id:
 *                 type: integer
 *               selector:
 *                 type: string
 *                 minLength: 12
 *                 maxLength: 12
 *               hashed_validator:
 *                 type: string
 *                 minLength: 64
 *                 maxLength: 64
 *               expires:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       "201":
 *         description: Created
 *   get:
 *     summary: Query user tokens
 *     tags: [User Tokens]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: integer
 *       - in: query
 *         name: selector
 *         schema:
 *           type: string
 *           minLength: 12
 *           maxLength: 12
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
  .post(auth('manageUsers'), validate(userTokenValidation.createUserToken), userTokenController.createUserToken)
  .get(auth('manageUsers'), validate(userTokenValidation.queryUserTokens), userTokenController.queryUserTokens);

/**
 * @swagger
 * /user-tokens/{tokenId}:
 *   get:
 *     summary: Get user token
 *     tags: [User Tokens]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tokenId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       "200":
 *         description: OK
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   patch:
 *     summary: Update user token
 *     tags: [User Tokens]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tokenId
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
 *               hashed_validator:
 *                 type: string
 *                 minLength: 64
 *                 maxLength: 64
 *               expires:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       "200":
 *         description: OK
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   delete:
 *     summary: Delete user token
 *     tags: [User Tokens]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tokenId
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
  .route('/:tokenId')
  .get(auth('manageUsers'), validate(userTokenValidation.getUserToken), userTokenController.getUserToken)
  .patch(auth('manageUsers'), validate(userTokenValidation.updateUserToken), userTokenController.updateUserToken)
  .delete(auth('manageUsers'), validate(userTokenValidation.deleteUserToken), userTokenController.deleteUserToken);

/**
 * @swagger
 * /user-tokens/selector/{selector}:
 *   get:
 *     summary: Get user token by selector
 *     tags: [User Tokens]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: selector
 *         required: true
 *         schema:
 *           type: string
 *           minLength: 12
 *           maxLength: 12
 *     responses:
 *       "200":
 *         description: OK
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
router
  .route('/selector/:selector')
  .get(auth('manageUsers'), validate(userTokenValidation.getUserTokenBySelector), userTokenController.getUserTokenBySelector);

/**
 * @swagger
 * /user-tokens/user/{userId}:
 *   get:
 *     summary: Get user tokens by user
 *     tags: [User Tokens]
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
 *   delete:
 *     summary: Delete all user tokens for user
 *     tags: [User Tokens]
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
  .get(auth('manageUsers'), validate(userTokenValidation.getUserTokensByUser), userTokenController.getUserTokensByUser)
  .delete(auth('manageUsers'), validate(userTokenValidation.deleteUserTokensByUser), userTokenController.deleteUserTokensByUser);

/**
 * @swagger
 * /user-tokens/cleanup:
 *   delete:
 *     summary: Delete expired tokens
 *     tags: [User Tokens]
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
  .delete(auth('manageUsers'), userTokenController.deleteExpiredTokens);

module.exports = router;