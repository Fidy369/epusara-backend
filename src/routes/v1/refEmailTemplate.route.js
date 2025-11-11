const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const refEmailTemplateValidation = require('../../validations/refEmailTemplate.validation');
const refEmailTemplateController = require('../../controllers/refEmailTemplate.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: RefEmailTemplate
 *   description: Email template reference management
 */

/**
 * @swagger
 * /ref_email_template:
 *   post:
 *     summary: Create email template reference
 *     tags: [RefEmailTemplate]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - kod_email_template
 *               - description
 *               - title
 *               - content
 *             properties:
 *               kod_email_template:
 *                 type: string
 *                 maxLength: 50
 *               description:
 *                 type: string
 *                 maxLength: 50
 *               title:
 *                 type: string
 *                 maxLength: 50
 *               content:
 *                 type: string
 *                 maxLength: 50
 *               is_active:
 *                 type: boolean
 *     responses:
 *       "201":
 *         description: Created
 *   get:
 *     summary: Get all email template references
 *     tags: [RefEmailTemplate]
 *     parameters:
 *       - in: query
 *         name: kod_email_template
 *         schema:
 *           type: string
 *       - in: query
 *         name: is_active
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: title
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
 */
router
  .route('/')
  .post(/*auth(),*/ validate(refEmailTemplateValidation.createRefEmailTemplate), refEmailTemplateController.createRefEmailTemplate)
  .get(/*auth(),*/ validate(refEmailTemplateValidation.getRefEmailTemplates), refEmailTemplateController.getRefEmailTemplates);

/**
 * @swagger
 * /ref_email_template/{id}:
 *   get:
 *     summary: Get email template reference by ID
 *     tags: [RefEmailTemplate]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Email template ID
 *     responses:
 *       "200":
 *         description: OK
 *       "404":
 *         description: Not found
 *   patch:
 *     summary: Update email template reference
 *     tags: [RefEmailTemplate]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Email template ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               kod_email_template:
 *                 type: string
 *                 maxLength: 50
 *               description:
 *                 type: string
 *                 maxLength: 50
 *               title:
 *                 type: string
 *                 maxLength: 50
 *               content:
 *                 type: string
 *                 maxLength: 50
 *               is_active:
 *                 type: boolean
 *     responses:
 *       "200":
 *         description: OK
 *       "404":
 *         description: Not found
 *   delete:
 *     summary: Delete email template reference
 *     tags: [RefEmailTemplate]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Email template ID
 *     responses:
 *       "204":
 *         description: No content
 *       "404":
 *         description: Not found
 */
router
  .route('/:id')
  .get(/*auth(),*/ validate(refEmailTemplateValidation.getRefEmailTemplate), refEmailTemplateController.getRefEmailTemplate)
  .patch(/*auth(),*/ validate(refEmailTemplateValidation.updateRefEmailTemplate), refEmailTemplateController.updateRefEmailTemplate)
  .delete(/*auth(),*/ validate(refEmailTemplateValidation.deleteRefEmailTemplate), refEmailTemplateController.deleteRefEmailTemplate);

module.exports = router;