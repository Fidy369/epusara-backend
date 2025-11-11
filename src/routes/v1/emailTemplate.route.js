const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const emailTemplateValidation = require('../../validations/emailTemplate.validation');
const emailTemplateController = require('../../controllers/emailTemplate.controller');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     EmailTemplate:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated unique identifier
 *         key:
 *           type: string
 *           description: Template key identifier
 *         description:
 *           type: string
 *           description: Template description
 *         title:
 *           type: string
 *           description: Email template title
 *         content:
 *           type: string
 *           description: Email template content
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
 *   name: EmailTemplate
 *   description: Email template management
 */

/**
 * @swagger
 * /email-templates:
 *   post:
 *     summary: Create email template
 *     tags: [EmailTemplate]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               key:
 *                 type: string
 *               description:
 *                 type: string
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EmailTemplate'
 *   get:
 *     summary: Get all email templates
 *     tags: [EmailTemplate]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: key
 *         schema:
 *           type: string
 *         description: Filter by template key
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Filter by title
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Sort by field
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Maximum number of results
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EmailTemplate'
 */
router
  .route('/')
  .post(/*auth(),*/ validate(emailTemplateValidation.createEmailTemplate), emailTemplateController.createEmailTemplate)
  .get(/*auth(),*/ validate(emailTemplateValidation.getEmailTemplates), emailTemplateController.getEmailTemplates);

/**
 * @swagger
 * /email-templates/{id}:
 *   get:
 *     summary: Get email template by ID
 *     tags: [EmailTemplate]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Template ID
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EmailTemplate'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   patch:
 *     summary: Update email template
 *     tags: [EmailTemplate]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Template ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               key:
 *                 type: string
 *               description:
 *                 type: string
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EmailTemplate'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   delete:
 *     summary: Delete email template
 *     tags: [EmailTemplate]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Template ID
 *     responses:
 *       "204":
 *         description: No content
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
router
  .route('/:id')
  .get(/*auth(),*/ validate(emailTemplateValidation.getEmailTemplateById), emailTemplateController.getEmailTemplateById)
  .patch(/*auth(),*/ validate(emailTemplateValidation.updateEmailTemplate), emailTemplateController.updateEmailTemplate)
  .delete(/*auth(),*/ validate(emailTemplateValidation.deleteEmailTemplate), emailTemplateController.deleteEmailTemplate);

/**
 * @swagger
 * /email-templates/key/{key}:
 *   get:
 *     summary: Get email template by key
 *     tags: [EmailTemplate]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *         description: Template key
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EmailTemplate'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
router.get('/key/:key', /*auth(),*/ validate(emailTemplateValidation.getEmailTemplateByKey), emailTemplateController.getEmailTemplateByKey);

/**
 * @swagger
 * /email-templates/active:
 *   get:
 *     summary: Get all active email templates
 *     tags: [EmailTemplate]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EmailTemplate'
 */
router.get('/active', /*auth(),*/ emailTemplateController.getActiveTemplates);

module.exports = router;