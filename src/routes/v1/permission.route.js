const express = require('express');
const validate = require('../../middlewares/validate');
const permissionValidation = require('../../validations/permission.validation');
const permissionController = require('../../controllers/permission.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(permissionValidation.createPermission), permissionController.createPermission)
  .get(validate(permissionValidation.getPermissions), permissionController.getPermissions);

router
  .route('/:permissionId')
  .get(validate(permissionValidation.getPermission), permissionController.getPermission)
  .patch(validate(permissionValidation.updatePermission), permissionController.updatePermission)
  .delete(validate(permissionValidation.deletePermission), permissionController.deletePermission);

// Role-Permission assignment routes
router
  .route('/roles/:roleId/permissions/:permissionId')
  .post(validate(permissionValidation.assignPermissionToRole), permissionController.assignPermissionToRole)
  .delete(validate(permissionValidation.removePermissionFromRole), permissionController.removePermissionFromRole);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Permissions
 *   description: Permission management and role assignments
 */

/**
 * @swagger
 * /permissions:
 *   post:
 *     summary: Create a permission
 *     tags: [Permissions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *             example:
 *               name: manageApplications
 *               description: Can manage burial applications
 *     responses:
 *       "201":
 *         description: Created
 *       "400":
 *         description: Bad Request
 *
 *   get:
 *     summary: Get all permissions
 *     tags: [Permissions]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Permission name
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
 *         description: Maximum number of permissions
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
 * /permissions/{id}:
 *   get:
 *     summary: Get a permission
 *     tags: [Permissions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Permission id
 *     responses:
 *       "200":
 *         description: OK
 *       "404":
 *         description: Not found
 *
 *   patch:
 *     summary: Update a permission
 *     tags: [Permissions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Permission id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *             example:
 *               name: manageApplications
 *               description: Updated description
 *     responses:
 *       "200":
 *         description: OK
 *       "404":
 *         description: Not found
 *
 *   delete:
 *     summary: Delete a permission
 *     tags: [Permissions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Permission id
 *     responses:
 *       "204":
 *         description: No content
 *       "404":
 *         description: Not found
 */

/**
 * @swagger
 * /permissions/roles/{roleId}/permissions/{permissionId}:
 *   post:
 *     summary: Assign permission to role
 *     tags: [Permissions]
 *     parameters:
 *       - in: path
 *         name: roleId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Role id
 *       - in: path
 *         name: permissionId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Permission id
 *     responses:
 *       "201":
 *         description: Created
 *       "400":
 *         description: Bad Request
 *       "404":
 *         description: Not found
 *
 *   delete:
 *     summary: Remove permission from role
 *     tags: [Permissions]
 *     parameters:
 *       - in: path
 *         name: roleId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Role id
 *       - in: path
 *         name: permissionId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Permission id
 *     responses:
 *       "204":
 *         description: No content
 *       "404":
 *         description: Not found
 */