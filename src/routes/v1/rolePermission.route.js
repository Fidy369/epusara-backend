const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const rolePermissionValidation = require('../../validations/rolePermission.validation');
const rolePermissionController = require('../../controllers/rolePermission.controller');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     RolePermission:
 *       type: object
 *       properties:
 *         role_id:
 *           type: integer
 *         permission_id:
 *           type: integer
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
 *   name: RolePermission
 *   description: Role permission assignment management
 */

/**
 * @swagger
 * /role-permission:
 *   post:
 *     summary: Assign permission to role
 *     tags: [RolePermission]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - roleId
 *               - permissionId
 *             properties:
 *               roleId:
 *                 type: integer
 *               permissionId:
 *                 type: integer
 *               createdBy:
 *                 type: integer
 *     responses:
 *       "201":
 *         description: Created
 *   get:
 *     summary: Get all role permission assignments
 *     tags: [RolePermission]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: role_id
 *         schema:
 *           type: integer
 *       - in: query
 *         name: permission_id
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
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *     responses:
 *       "200":
 *         description: OK
 */
router
  .route('/')
  .post(/*auth(),*/ validate(rolePermissionValidation.assignPermissionToRole), rolePermissionController.assignPermissionToRole)
  .get(/*auth(),*/ validate(rolePermissionValidation.getRolePermissions), rolePermissionController.getRolePermissions);

/**
 * @swagger
 * /role-permission/role/{roleId}/permissions:
 *   get:
 *     summary: Get permissions by role
 *     tags: [RolePermission]
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
 *   put:
 *     summary: Replace all permissions for a role
 *     tags: [RolePermission]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roleId
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
 *               - permission_ids
 *               - updated_by
 *             properties:
 *               permission_ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *               updated_by:
 *                 type: integer
 *     responses:
 *       "200":
 *         description: OK
 *       "404":
 *         description: Not found
 */
router
  .route('/role/:roleId/permissions')
  .get(/*auth(),*/ validate(rolePermissionValidation.getPermissionsByRole), rolePermissionController.getPermissionsByRole)
  .put(/*auth(),*/ validate(rolePermissionValidation.replaceRolePermissions), rolePermissionController.replaceRolePermissions);

/**
 * @swagger
 * /role-permission/permission/{permissionId}/roles:
 *   get:
 *     summary: Get roles by permission
 *     tags: [RolePermission]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: permissionId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       "200":
 *         description: OK
 */
router.get('/permission/:permissionId/roles', /*auth(),*/ validate(rolePermissionValidation.getRolesByPermission), rolePermissionController.getRolesByPermission);

/**
 * @swagger
 * /role-permission/role/{roleId}/permission/{permissionId}:
 *   delete:
 *     summary: Remove permission from role
 *     tags: [RolePermission]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roleId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: permissionId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       "204":
 *         description: No content
 */
router.delete('/role/:roleId/permission/:permissionId', /*auth(),*/ validate(rolePermissionValidation.removePermissionFromRole), rolePermissionController.removePermissionFromRole);

/**
 * @swagger
 * /role-permission/bulk-assign:
 *   post:
 *     summary: Bulk assign permissions to role
 *     tags: [RolePermission]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - roleId
 *               - permissionIds
 *             properties:
 *               roleId:
 *                 type: integer
 *               permissionIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *               createdBy:
 *                 type: integer
 *     responses:
 *       "200":
 *         description: OK
 */
router.post('/bulk-assign', /*auth(),*/ validate(rolePermissionValidation.bulkAssignPermissionsToRole), rolePermissionController.bulkAssignPermissionsToRole);

/**
 * @swagger
 * /role-permission/role/{roleId}/clear:
 *   delete:
 *     summary: Remove all permissions from role
 *     tags: [RolePermission]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roleId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       "204":
 *         description: No content
 */
router.delete('/role/:roleId/clear', /*auth(),*/ validate(rolePermissionValidation.removeAllPermissionsFromRole), rolePermissionController.removeAllPermissionsFromRole);

module.exports = router;