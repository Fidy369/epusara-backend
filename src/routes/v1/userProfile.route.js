const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userProfileValidation = require('../../validations/userProfile.validation');
const userProfileController = require('../../controllers/userProfile.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User Profiles
 *   description: User profile management
 */

/**
 * @swagger
 * /user-profiles:
 *   post:
 *     summary: Create user profile
 *     tags: [User Profiles]
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
 *             properties:
 *               user_id:
 *                 type: integer
 *               full_name:
 *                 type: string
 *               phone_no:
 *                 type: string
 *                 maxLength: 15
 *               email:
 *                 type: string
 *                 format: email
 *               gender:
 *                 type: string
 *                 enum: [male, female, other]
 *               jenis_pengenalan:
 *                 type: string
 *                 enum: [NRIC, PASSPORT]
 *               no_pengenalan:
 *                 type: string
 *                 maxLength: 12
 *               address1:
 *                 type: string
 *                 maxLength: 300
 *               address2:
 *                 type: string
 *                 maxLength: 300
 *               address3:
 *                 type: string
 *                 maxLength: 300
 *               poskod:
 *                 type: string
 *                 maxLength: 5
 *               bandar:
 *                 type: string
 *                 maxLength: 100
 *               daerah:
 *                 type: string
 *                 maxLength: 100
 *               negeri:
 *                 type: string
 *                 maxLength: 100
 *     responses:
 *       "201":
 *         description: Created
 *   get:
 *     summary: Query user profiles
 *     tags: [User Profiles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: integer
 *       - in: query
 *         name: gender
 *         schema:
 *           type: string
 *           enum: [male, female, other]
 *       - in: query
 *         name: jenis_pengenalan
 *         schema:
 *           type: string
 *           enum: [NRIC, PASSPORT]
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
  .post(auth('manageUsers'), validate(userProfileValidation.createUserProfile), userProfileController.createUserProfile)
  .get(auth('getUsers'), validate(userProfileValidation.queryUserProfiles), userProfileController.queryUserProfiles);

/**
 * @swagger
 * /user-profiles/{profileId}:
 *   get:
 *     summary: Get user profile
 *     tags: [User Profiles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: profileId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       "200":
 *         description: OK
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   put:
 *     summary: Replace user profile (full update)
 *     tags: [User Profiles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: profileId
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
 *               - full_name
 *               - phone_no
 *               - email
 *               - gender
 *               - jenis_pengenalan
 *               - no_pengenalan
 *               - address1
 *               - poskod
 *               - bandar
 *               - daerah
 *               - negeri
 *             properties:
 *               full_name:
 *                 type: string
 *               phone_no:
 *                 type: string
 *                 maxLength: 15
 *               email:
 *                 type: string
 *                 format: email
 *               gender:
 *                 type: string
 *                 enum: [male, female, other]
 *               jenis_pengenalan:
 *                 type: string
 *                 enum: [NRIC, PASSPORT]
 *               no_pengenalan:
 *                 type: string
 *                 maxLength: 12
 *               address1:
 *                 type: string
 *                 maxLength: 300
 *               address2:
 *                 type: string
 *                 maxLength: 300
 *               address3:
 *                 type: string
 *                 maxLength: 300
 *               poskod:
 *                 type: string
 *                 maxLength: 5
 *               bandar:
 *                 type: string
 *                 maxLength: 100
 *               daerah:
 *                 type: string
 *                 maxLength: 100
 *               negeri:
 *                 type: string
 *                 maxLength: 100
 *     responses:
 *       "200":
 *         description: OK
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   patch:
 *     summary: Update user profile (partial update)
 *     tags: [User Profiles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: profileId
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
 *               full_name:
 *                 type: string
 *               phone_no:
 *                 type: string
 *                 maxLength: 15
 *               email:
 *                 type: string
 *                 format: email
 *               gender:
 *                 type: string
 *                 enum: [male, female, other]
 *               jenis_pengenalan:
 *                 type: string
 *                 enum: [NRIC, PASSPORT]
 *               no_pengenalan:
 *                 type: string
 *                 maxLength: 12
 *               address1:
 *                 type: string
 *                 maxLength: 300
 *               address2:
 *                 type: string
 *                 maxLength: 300
 *               address3:
 *                 type: string
 *                 maxLength: 300
 *               poskod:
 *                 type: string
 *                 maxLength: 5
 *               bandar:
 *                 type: string
 *                 maxLength: 100
 *               daerah:
 *                 type: string
 *                 maxLength: 100
 *               negeri:
 *                 type: string
 *                 maxLength: 100
 *     responses:
 *       "200":
 *         description: OK
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   delete:
 *     summary: Delete user profile
 *     tags: [User Profiles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: profileId
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
  .route('/:profileId')
  .get(auth('getUsers'), validate(userProfileValidation.getUserProfile), userProfileController.getUserProfile)
  .put(auth('manageUsers'), validate(userProfileValidation.replaceUserProfile), userProfileController.replaceUserProfile)
  .patch(auth('manageUsers'), validate(userProfileValidation.updateUserProfile), userProfileController.updateUserProfile)
  .delete(auth('manageUsers'), validate(userProfileValidation.deleteUserProfile), userProfileController.deleteUserProfile);

/**
 * @swagger
 * /user-profiles/user/{userId}:
 *   get:
 *     summary: Get user profile by user ID
 *     tags: [User Profiles]
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
 */
router
  .route('/user/:userId')
  .get(auth('getUsers'), validate(userProfileValidation.getUserProfileByUserId), userProfileController.getUserProfileByUserId);

module.exports = router;