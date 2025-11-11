const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const attachmentValidation = require('../../validations/attachment.validation');
const attachmentController = require('../../controllers/attachment.controller');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Attachment:
 *       type: object
 *       required:
 *         - file_name
 *         - mime_type
 *         - extension
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated unique identifier
 *         uuid:
 *           type: string
 *           format: binary
 *           description: Unique binary identifier
 *         file_name:
 *           type: string
 *           description: Original file name
 *         file_size:
 *           type: integer
 *           description: File size in bytes
 *         file_path:
 *           type: string
 *           description: File storage path
 *         mime_type:
 *           type: string
 *           description: File MIME type
 *         extension:
 *           type: string
 *           description: File extension
 *         uploaded_at:
 *           type: string
 *           format: date-time
 *         uploaded_by:
 *           type: integer
 *           description: User ID who uploaded the file
 */

/**
 * @swagger
 * tags:
 *   name: Attachment
 *   description: File attachment management
 */

/**
 * @swagger
 * /attachments:
 *   post:
 *     summary: Create an attachment
 *     tags: [Attachment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - file_name
 *               - mime_type
 *               - extension
 *             properties:
 *               file_name:
 *                 type: string
 *               file_size:
 *                 type: integer
 *               file_path:
 *                 type: string
 *               mime_type:
 *                 type: string
 *               extension:
 *                 type: string
 *               uploaded_by:
 *                 type: integer
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Attachment'
 *   get:
 *     summary: Get all attachments
 *     tags: [Attachment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: file_name
 *         schema:
 *           type: string
 *         description: Filter by file name
 *       - in: query
 *         name: mime_type
 *         schema:
 *           type: string
 *         description: Filter by MIME type
 *       - in: query
 *         name: extension
 *         schema:
 *           type: string
 *         description: Filter by file extension
 *       - in: query
 *         name: uploaded_by
 *         schema:
 *           type: integer
 *         description: Filter by uploader user ID
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
 *                 $ref: '#/components/schemas/Attachment'
 */
router
  .route('/')
  .post(/*auth(),*/ validate(attachmentValidation.createAttachment), attachmentController.createAttachment) // UNCOMMENT: auth(),
  .get(auth(), validate(attachmentValidation.getAttachments), attachmentController.getAttachments);

/**
 * @swagger
 * /attachments/uuid/{uuid}:
 *   get:
 *     summary: Get attachment by UUID
 *     tags: [Attachment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *         description: Attachment UUID
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Attachment'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
router.get('/uuid/:uuid', /*auth(),*/ validate(attachmentValidation.getAttachmentByUuid), attachmentController.getAttachmentByUuid); // UNCOMMENT: auth(),

/**
 * @swagger
 * /attachments/type/{mimeType}:
 *   get:
 *     summary: Get attachments by MIME type
 *     tags: [Attachment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: mimeType
 *         required: true
 *         schema:
 *           type: string
 *         description: MIME type
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Attachment'
 */
router.get('/type/:mimeType', /*auth(),*/ validate(attachmentValidation.getAttachmentsByType), attachmentController.getAttachmentsByType); // UNCOMMENT: auth(),

/**
 * @swagger
 * /attachments/uploader/{uploadedBy}:
 *   get:
 *     summary: Get attachments by uploader
 *     tags: [Attachment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uploadedBy
 *         required: true
 *         schema:
 *           type: integer
 *         description: Uploader user ID
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Attachment'
 */
router.get('/uploader/:uploadedBy', /*auth(),*/ validate(attachmentValidation.getAttachmentsByUploader), attachmentController.getAttachmentsByUploader); // UNCOMMENT: auth(),

/**
 * @swagger
 * /attachments/{id}:
 *   get:
 *     summary: Get an attachment
 *     tags: [Attachment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Attachment id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Attachment'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   patch:
 *     summary: Update an attachment
 *     tags: [Attachment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Attachment id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               file_name:
 *                 type: string
 *               file_size:
 *                 type: integer
 *               file_path:
 *                 type: string
 *               mime_type:
 *                 type: string
 *               extension:
 *                 type: string
 *               uploaded_by:
 *                 type: integer
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Attachment'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   delete:
 *     summary: Delete an attachment
 *     tags: [Attachment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Attachment id
 *     responses:
 *       "204":
 *         description: No content
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
router
  .route('/:attachmentId')
  .get(auth(), validate(attachmentValidation.getAttachment), attachmentController.getAttachment) // UNCOMMENT: auth(),
  .patch(auth(), validate(attachmentValidation.updateAttachment), attachmentController.updateAttachment) // UNCOMMENT: auth(),
  .delete(auth(), validate(attachmentValidation.deleteAttachment), attachmentController.deleteAttachment); // UNCOMMENT: auth(),

module.exports = router;