const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const permohonanNotesValidation = require('../../validations/permohonanNotes.validation');
const permohonanNotesController = require('../../controllers/permohonanNotes.controller');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     PermohonanNotes:
 *       type: object
 *       required:
 *         - permohonan_id
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated unique identifier
 *         permohonan_id:
 *           type: integer
 *           description: Application ID
 *         type:
 *           type: string
 *           description: Note type or category
 *         notes:
 *           type: string
 *           description: Note content
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
 *   name: PermohonanNotes
 *   description: Application notes management
 */

/**
 * @swagger
 * /application-notes:
 *   post:
 *     summary: Create application note
 *     tags: [PermohonanNotes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - permohonan_id
 *             properties:
 *               permohonan_id:
 *                 type: integer
 *               type:
 *                 type: string
 *               notes:
 *                 type: string
 *               created_by:
 *                 type: integer
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PermohonanNotes'
 *   get:
 *     summary: Get all application notes
 *     tags: [PermohonanNotes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: permohonan_id
 *         schema:
 *           type: integer
 *         description: Filter by application ID
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filter by note type
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
 *                 $ref: '#/components/schemas/PermohonanNotes'
 */
router
  .route('/')
  .post(/*auth(),*/ validate(permohonanNotesValidation.createPermohonanNotes), permohonanNotesController.createPermohonanNotes)
  .get(/*auth(),*/ validate(permohonanNotesValidation.getPermohonanNotes), permohonanNotesController.getPermohonanNotes);

/**
 * @swagger
 * /application-notes/{id}:
 *   get:
 *     summary: Get application note by ID
 *     tags: [PermohonanNotes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Note ID
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PermohonanNotes'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   patch:
 *     summary: Update application note
 *     tags: [PermohonanNotes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Note ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               permohonan_id:
 *                 type: integer
 *               type:
 *                 type: string
 *               notes:
 *                 type: string
 *               updated_by:
 *                 type: integer
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PermohonanNotes'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   delete:
 *     summary: Delete application note
 *     tags: [PermohonanNotes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Note ID
 *     responses:
 *       "204":
 *         description: No content
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
router
  .route('/:id')
  .get(/*auth(),*/ validate(permohonanNotesValidation.getPermohonanNotesById), permohonanNotesController.getPermohonanNotesById)
  .patch(/*auth(),*/ validate(permohonanNotesValidation.updatePermohonanNotes), permohonanNotesController.updatePermohonanNotes)
  .delete(/*auth(),*/ validate(permohonanNotesValidation.deletePermohonanNotes), permohonanNotesController.deletePermohonanNotes);

/**
 * @swagger
 * /application-notes/application/{permohonanId}:
 *   get:
 *     summary: Get notes by application ID
 *     tags: [PermohonanNotes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: permohonanId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Application ID
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PermohonanNotes'
 */
router.get('/application/:permohonanId', /*auth(),*/ validate(permohonanNotesValidation.getByPermohonanId), permohonanNotesController.getByPermohonanId);

/**
 * @swagger
 * /application-notes/type/{type}:
 *   get:
 *     summary: Get notes by type
 *     tags: [PermohonanNotes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *         description: Note type
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PermohonanNotes'
 */
router.get('/type/:type', /*auth(),*/ validate(permohonanNotesValidation.getByType), permohonanNotesController.getByType);

module.exports = router;