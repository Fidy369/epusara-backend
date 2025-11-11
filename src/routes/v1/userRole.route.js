const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userRoleValidation = require('../../validations/userRole.validation');
const userRoleController = require('../../controllers/userRole.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User Roles
 *   description: User role assignment management
 */

/**
 * @swagger
 * /user-roles:
 *   post:
 *     summary: Assign role to user
 *     tags: [User Roles]
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
 *               - role_id
 *             properties:
 *               user_id:
 *                 type: integer
 *               role_id:
 *                 type: integer
 *     responses:
 *       "201":
 *         description: Created
 *       "400":
 *         description: User already has this role
 *   get:
 *     summary: Query user role assignments
 *     tags: [User Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: integer
 *       - in: query
 *         name: role_id
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
  .post(auth('manageUsers'), validate(userRoleValidation.assignRoleToUser), userRoleController.assignRoleToUser)
  .get(auth('getUsers'), validate(userRoleValidation.queryUserRoleAssignments), userRoleController.queryUserRoleAssignments);

/**
 * @swagger
 * /user-roles/remove:
 *   delete:
 *     summary: Remove role from user
 *     tags: [User Roles]
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
 *               - role_id
 *             properties:
 *               user_id:
 *                 type: integer
 *               role_id:
 *                 type: integer
 *     responses:
 *       "204":
 *         description: No content
 *       "404":
 *         description: Assignment not found
 */
router
  .route('/remove')
  .delete(auth('manageUsers'), validate(userRoleValidation.removeRoleFromUser), userRoleController.removeRoleFromUser);

/**
 * @swagger
 * /user-roles/user/{userId}:
 *   get:
 *     summary: Get roles by user
 *     tags: [User Roles]
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
 *     summary: Remove all roles from user
 *     tags: [User Roles]
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
  .get(auth('getUsers'), validate(userRoleValidation.getRolesByUser), userRoleController.getRolesByUser)
  .delete(auth('manageUsers'), validate(userRoleValidation.removeAllRolesFromUser), userRoleController.removeAllRolesFromUser);

/**
 * @swagger
 * /user-roles/role/{roleId}:
 *   get:
 *     summary: Get users by role
 *     tags: [User Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roleId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       "200":
 *         description: OK
 *   delete:
 *     summary: Remove all users from role
 *     tags: [User Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roleId
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
  .route('/role/:roleId')
  .get(auth('getUsers'), validate(userRoleValidation.getUsersByRole), userRoleController.getUsersByRole)
  .delete(auth('manageUsers'), validate(userRoleValidation.removeAllUsersFromRole), userRoleController.removeAllUsersFromRole);

module.exports = router;