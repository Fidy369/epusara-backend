const express = require('express');
const validate = require('../../middlewares/validate');
const userTapakPerkuburanValidation = require('../../validations/userTapakPerkuburan.validation');
const userTapakPerkuburanController = require('../../controllers/userTapakPerkuburan.controller');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     UserTapakPerkuburan:
 *       type: object
 *       required:
 *         - user_id
 *         - tapak_perkuburan_id
 *       properties:
 *         user_id:
 *           type: integer
 *           description: User ID
 *         tapak_perkuburan_id:
 *           type: integer
 *           description: Cemetery site ID
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * tags:
 *   name: UserTapakPerkuburan
 *   description: User cemetery site assignment management
 */

/**
 * @swagger
 * /user-tapak-perkuburan:
 *   post:
 *     summary: Assign user to cemetery site
 *     tags: [UserTapakPerkuburan]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserTapakPerkuburan'
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserTapakPerkuburan'
 *   get:
 *     summary: Get all user site assignments
 *     tags: [UserTapakPerkuburan]
 *     parameters:
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: integer
 *         description: User ID
 *       - in: query
 *         name: tapak_perkuburan_id
 *         schema:
 *           type: integer
 *         description: Cemetery site ID
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. created_at:desc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of assignments
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
 * /user-tapak-perkuburan/{userId}/{siteId}:
 *   get:
 *     summary: Get a user site assignment
 *     tags: [UserTapakPerkuburan]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *       - in: path
 *         name: siteId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Cemetery site ID
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserTapakPerkuburan'
 *       "404":
 *         description: Not found
 *   put:
 *     summary: Update user site assignment
 *     tags: [UserTapakPerkuburan]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *       - in: path
 *         name: siteId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Current cemetery site ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tapak_perkuburan_id
 *             properties:
 *               tapak_perkuburan_id:
 *                 type: integer
 *                 description: New cemetery site ID
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserTapakPerkuburan'
 *       "404":
 *         description: Not found
 *   delete:
 *     summary: Remove user from cemetery site
 *     tags: [UserTapakPerkuburan]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *       - in: path
 *         name: siteId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Cemetery site ID
 *     responses:
 *       "204":
 *         description: No content
 *       "404":
 *         description: Not found
 */

router
  .route('/')
  .post(validate(userTapakPerkuburanValidation.assignUserToSite), userTapakPerkuburanController.assignUserToSite)
  .get(validate(userTapakPerkuburanValidation.getUserSiteAssignments), userTapakPerkuburanController.getUserSiteAssignments);

router
  .route('/:userId/:siteId')
  .get(validate(userTapakPerkuburanValidation.getUserSiteAssignment), userTapakPerkuburanController.getUserSiteAssignment)
  .put(validate(userTapakPerkuburanValidation.updateUserSiteAssignment), userTapakPerkuburanController.updateUserSiteAssignment) // NEW
  .delete(validate(userTapakPerkuburanValidation.removeUserFromSite), userTapakPerkuburanController.removeUserFromSite);

module.exports = router;