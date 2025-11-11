const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const menuValidation = require('../../validations/menu.validation');
const menuController = require('../../controllers/menu.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Menus
 *   description: Menu management and navigation
 */

/**
 * @swagger
 * /menus:
 *   post:
 *     summary: Create menu
 *     description: Create a new menu item
 *     tags: [Menus]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - label_ms
 *               - label_en
 *               - url
 *             properties:
 *               parent_id:
 *                 type: integer
 *               name:
 *                 type: string
 *               label_ms:
 *                 type: string
 *               label_en:
 *                 type: string
 *               description:
 *                 type: string
 *               icon_name:
 *                 type: string
 *               icon_color:
 *                 type: string
 *               url:
 *                 type: string
 *               order:
 *                 type: integer
 *               status:
 *                 type: integer
 *                 enum: [0, 1]
 *     responses:
 *       "201":
 *         description: Created
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *   get:
 *     summary: Query menus
 *     description: Retrieve menus with filtering and pagination
 *     tags: [Menus]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: parent_id
 *         schema:
 *           type: integer
 *       - in: query
 *         name: status
 *         schema:
 *           type: integer
 *           enum: [0, 1]
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
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
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
router
  .route('/')
  .post(/*auth('manageMenus'),*/ validate(menuValidation.createMenu), menuController.createMenu)
  .get(/*auth('viewMenus'),*/ validate(menuValidation.queryMenus), menuController.queryMenus);

/**
 * @swagger
 * /menus/hierarchy:
 *   get:
 *     summary: Get menu hierarchy
 *     description: Retrieve complete menu hierarchy with parent-child relationships
 *     tags: [Menus]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
router
  .route('/hierarchy')
  .get(/*auth('viewMenus'),*/ menuController.getMenuHierarchy);

/**
 * @swagger
 * /menus/user:
 *   get:
 *     summary: Get user menu
 *     description: Retrieve menu items accessible to current user based on roles
 *     tags: [Menus]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 */
router
  .route('/user')
  .get(/*auth(),*/ validate(menuValidation.getUserMenu), menuController.getUserMenu);

/**
 * @swagger
 * /menus/{menuId}:
 *   get:
 *     summary: Get menu
 *     description: Retrieve menu by ID
 *     tags: [Menus]
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
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   patch:
 *     summary: Update menu
 *     description: Update menu by ID
 *     tags: [Menus]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: menuId
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
 *               parent_id:
 *                 type: integer
 *               name:
 *                 type: string
 *               label_ms:
 *                 type: string
 *               label_en:
 *                 type: string
 *               description:
 *                 type: string
 *               icon_name:
 *                 type: string
 *               icon_color:
 *                 type: string
 *               url:
 *                 type: string
 *               order:
 *                 type: integer
 *               status:
 *                 type: integer
 *                 enum: [0, 1]
 *     responses:
 *       "200":
 *         description: OK
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   delete:
 *     summary: Delete menu
 *     description: Delete menu by ID
 *     tags: [Menus]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: menuId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       "204":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
router
  .route('/:menuId')
  .get(/*auth('viewMenus'),*/ validate(menuValidation.getMenu), menuController.getMenu)
  .patch(/*auth('manageMenus'),*/ validate(menuValidation.updateMenu), menuController.updateMenu)
  .delete(/*auth('manageMenus'),*/ validate(menuValidation.deleteMenu), menuController.deleteMenu);

/**
 * @swagger
 * /menus/role/assign:
 *   post:
 *     summary: Assign menu to role
 *     description: Assign menu access to a role
 *     tags: [Menus]
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
 *     responses:
 *       "201":
 *         description: Created
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
router
  .route('/role/assign')
  .post(auth('manageMenus'), validate(menuValidation.assignMenuToRole), menuController.assignMenuToRole);

/**
 * @swagger
 * /menus/role/remove:
 *   delete:
 *     summary: Remove menu from role
 *     description: Remove menu access from a role
 *     tags: [Menus]
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
 *     responses:
 *       "204":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
router
  .route('/role/remove')
  .delete(auth('manageMenus'), validate(menuValidation.removeMenuFromRole), menuController.removeMenuFromRole);

module.exports = router;