const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const roleValidation = require('../../validations/role.validation');
const roleController = require('../../controllers/role.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(roleValidation.createRole), roleController.createRole) // Temporarily no auth
  .get(validate(roleValidation.getRoles), roleController.getRoles);

router
  .route('/:roleId')
  .get(validate(roleValidation.getRole), roleController.getRole)
  .patch(validate(roleValidation.updateRole), roleController.updateRole)
  .delete(validate(roleValidation.deleteRole), roleController.deleteRole);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Role management
 */

/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Create a role
 *     tags: [Roles]
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
 *               name: admin
 *               description: Administrator role
 *     responses:
 *       "201":
 *         description: Created
 *       "400":
 *         description: Bad Request
 *
 *   get:
 *     summary: Get all roles
 *     tags: [Roles]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Role name
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
 *         description: Maximum number of roles
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
 * /roles/{id}:
 *   get:
 *     summary: Get a role
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Role id
 *     responses:
 *       "200":
 *         description: OK
 *       "404":
 *         description: Not found
 *
 *   patch:
 *     summary: Update a role
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Role id
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
 *               name: admin
 *               description: Administrator role
 *     responses:
 *       "200":
 *         description: OK
 *       "404":
 *         description: Not found
 *
 *   delete:
 *     summary: Delete a role
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Role id
 *     responses:
 *       "204":
 *         description: No content
 *       "404":
 *         description: Not found
 */