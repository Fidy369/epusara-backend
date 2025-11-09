const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const refreshTokenValidation = require('../../validations/refreshToken.validation');
const refreshTokenController = require('../../controllers/refreshToken.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Refresh Tokens
 *   description: Refresh token management
 */

/**
 * @swagger
 * /refresh-tokens:
 *   post:
 *     summary: Create refresh token
 *     tags: [Refresh Tokens]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - expires_at
 *             properties:
 *               user_id:
 *                 type: integer
 *               token:
 *                 type: string
 *               expires_at:
 *                 type: string
 *                 format: date-time
 *               is_revoked:
 *                 type: boolean
 *     responses:
 *       "201":
 *         description: Created
 *   get:
 *     summary: Query refresh tokens
 *     tags: [Refresh Tokens]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: integer
 *       - in: query
 *         name: is_revoked
 *         schema:
 *           type: string
 *           enum: [true, false]
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
  .post(auth('manageUsers'), validate(refreshTokenValidation.createRefreshToken), refreshTokenController.createRefreshToken)
  .get(auth('manageUsers'), validate(refreshTokenValidation.queryRefreshTokens), refreshTokenController.queryRefreshTokens);

/**
 * @swagger
 * /refresh-tokens/{tokenId}:
 *   get:
 *     summary: Get refresh token
 *     tags: [Refresh Tokens]
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
 *   put:
 *     summary: Replace refresh token (full update)
 *     tags: [Refresh Tokens]
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
 *             required:
 *               - user_id
 *               - token
 *               - expires_at
 *               - is_revoked
 *             properties:
 *               user_id:
 *                 type: integer
 *               token:
 *                 type: string
 *               expires_at:
 *                 type: string
 *                 format: date-time
 *               is_revoked:
 *                 type: boolean
 *     responses:
 *       "200":
 *         description: OK
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   delete:
 *     summary: Delete refresh token
 *     tags: [Refresh Tokens]
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
  .get(auth('manageUsers'), validate(refreshTokenValidation.getRefreshToken), refreshTokenController.getRefreshToken)
  .put(auth('manageUsers'), validate(refreshTokenValidation.replaceRefreshToken), refreshTokenController.replaceRefreshToken)
  .delete(auth('manageUsers'), validate(refreshTokenValidation.deleteRefreshToken), refreshTokenController.deleteRefreshToken);

/**
 * @swagger
 * /refresh-tokens/{tokenId}/revoke:
 *   patch:
 *     summary: Revoke refresh token
 *     tags: [Refresh Tokens]
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
 */
router
  .route('/:tokenId/revoke')
  .patch(auth('manageUsers'), validate(refreshTokenValidation.revokeRefreshToken), refreshTokenController.revokeRefreshToken);

/**
 * @swagger
 * /refresh-tokens/user/{userId}:
 *   get:
 *     summary: Get refresh tokens by user
 *     tags: [Refresh Tokens]
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
 *     summary: Delete all refresh tokens for user
 *     tags: [Refresh Tokens]
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
  .get(auth('manageUsers'), validate(refreshTokenValidation.getRefreshTokensByUser), refreshTokenController.getRefreshTokensByUser)
  .delete(auth('manageUsers'), validate(refreshTokenValidation.deleteRefreshTokensByUser), refreshTokenController.deleteRefreshTokensByUser);

/**
 * @swagger
 * /refresh-tokens/cleanup:
 *   delete:
 *     summary: Delete expired refresh tokens
 *     tags: [Refresh Tokens]
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
  .delete(auth('manageUsers'), refreshTokenController.deleteExpiredTokens);

module.exports = router;