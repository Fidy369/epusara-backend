const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const roleMenuValidation = require('../../validations/roleMenu.validation');
const roleMenuController = require('../../controllers/roleMenu.controller');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     RoleMenu:
 *       type: object
 *       properties:
 *         role_id:
 *           type: integer
 *         menu_id:
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
 *   name: RoleMenu
 *   description: Role menu assignment management
 */

/**
 * @swagger
 * /role-menu:
 *   post:
 *     summary: Assign menu to role
 *     tags: [RoleMenu]
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
 *               - menuId
 *             properties:
 *               roleId:
 *                 type: integer
 *               menuId:
 *                 type: integer
 *               createdBy:
 *                 type: integer
 *     responses:
 *       "201":
 *         description: Created
 *   get:
 *     summary: Get all role menu assignments
 *     tags: [RoleMenu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: role_id
 *         schema:
 *           type: integer
 *       - in: query
 *         name: menu_id
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
  .post(/*auth(),*/ validate(roleMenuValidation.assignMenuToRole), roleMenuController.assignMenuToRole)
  .get(/*auth(),*/ validate(roleMenuValidation.getRoleMenus), roleMenuController.getRoleMenus);

/**
 * @swagger
 * /role-menu/role/{roleId}/menus:
 *   get:
 *     summary: Get menus by role
 *     tags: [RoleMenu]
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
 */
router.get('/role/:roleId/menus', /*auth(),*/ validate(roleMenuValidation.getMenusByRole), roleMenuController.getMenusByRole);

/**
 * @swagger
 * /role-menu/menu/{menuId}/roles:
 *   get:
 *     summary: Get roles by menu
 *     tags: [RoleMenu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: menuId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       "200":
 *         description: OK
 */
router.get('/menu/:menuId/roles', /*auth(),*/ validate(roleMenuValidation.getRolesByMenu), roleMenuController.getRolesByMenu);

/**
 * @swagger
 * /role-menu/role/{roleId}/menu/{menuId}:
 *   delete:
 *     summary: Remove menu from role
 *     tags: [RoleMenu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roleId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: menuId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       "204":
 *         description: No content
 */
router.delete('/role/:roleId/menu/:menuId', /*auth(),*/ validate(roleMenuValidation.removeMenuFromRole), roleMenuController.removeMenuFromRole);

/**
 * @swagger
 * /role-menu/bulk-assign:
 *   post:
 *     summary: Bulk assign menus to role
 *     tags: [RoleMenu]
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
 *               - menuIds
 *             properties:
 *               roleId:
 *                 type: integer
 *               menuIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *               createdBy:
 *                 type: integer
 *     responses:
 *       "200":
 *         description: OK
 */
router.post('/bulk-assign', /*auth(),*/ validate(roleMenuValidation.bulkAssignMenusToRole), roleMenuController.bulkAssignMenusToRole);

/**
 * @swagger
 * /role-menu/role/{roleId}/clear:
 *   delete:
 *     summary: Remove all menus from role
 *     tags: [RoleMenu]
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
router.delete('/role/:roleId/clear', /*auth(),*/ validate(roleMenuValidation.removeAllMenusFromRole), roleMenuController.removeAllMenusFromRole);

module.exports = router;