const express = require('express');
const validate = require('../../middlewares/validate');
const refPaparanPengumumanValidation = require('../../validations/refPaparanPengumuman.validation');
const refPaparanPengumumanController = require('../../controllers/refPaparanPengumuman.controller');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     RefPaparanPengumuman:
 *       type: object
 *       required:
 *         - id
 *         - content_ms
 *         - content_en
 *         - is_active
 *         - desktop_url
 *         - thumnail_url
 *         - mobile_url
 *         - created_by
 *         - updated_by
 *       properties:
 *         id:
 *           type: integer
 *           description: Announcement display ID
 *         content_ms:
 *           type: string
 *           description: Content in Malay
 *         content_en:
 *           type: string
 *           description: Content in English
 *         is_active:
 *           type: boolean
 *           description: Active status
 *         desktop_url:
 *           type: string
 *           maxLength: 255
 *           description: Desktop URL
 *         thumnail_url:
 *           type: string
 *           maxLength: 255
 *           description: Thumbnail URL
 *         mobile_url:
 *           type: string
 *           maxLength: 255
 *           description: Mobile URL
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
 *   name: RefPaparanPengumuman
 *   description: Reference announcement display management
 */

/**
 * @swagger
 * /ref_paparan_pengumuman:
 *   post:
 *     summary: Create a reference announcement display
 *     tags: [RefPaparanPengumuman]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RefPaparanPengumuman'
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RefPaparanPengumuman'
 *   get:
 *     summary: Get all reference announcement displays
 *     tags: [RefPaparanPengumuman]
 *     parameters:
 *       - in: query
 *         name: content_ms
 *         schema:
 *           type: string
 *         description: Content in Malay
 *       - in: query
 *         name: content_en
 *         schema:
 *           type: string
 *         description: Content in English
 *       - in: query
 *         name: is_active
 *         schema:
 *           type: boolean
 *         description: Active status
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. created_at:desc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of announcements
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
 * /ref_paparan_pengumuman/{id}:
 *   get:
 *     summary: Get a reference announcement display
 *     tags: [RefPaparanPengumuman]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Announcement display ID
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RefPaparanPengumuman'
 *       "404":
 *         description: Not found
 *   patch:
 *     summary: Update a reference announcement display
 *     tags: [RefPaparanPengumuman]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Announcement display ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content_ms:
 *                 type: string
 *               content_en:
 *                 type: string
 *               is_active:
 *                 type: boolean
 *               desktop_url:
 *                 type: string
 *                 maxLength: 255
 *               thumnail_url:
 *                 type: string
 *                 maxLength: 255
 *               mobile_url:
 *                 type: string
 *                 maxLength: 255
 *               updated_by:
 *                 type: integer
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RefPaparanPengumuman'
 *       "404":
 *         description: Not found
 *   put:
 *     summary: Replace a reference announcement display (full update)
 *     tags: [RefPaparanPengumuman]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Announcement display ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content_ms
 *               - content_en
 *               - is_active
 *               - desktop_url
 *               - thumnail_url
 *               - mobile_url
 *             properties:
 *               content_ms:
 *                 type: string
 *               content_en:
 *                 type: string
 *               is_active:
 *                 type: boolean
 *               desktop_url:
 *                 type: string
 *                 maxLength: 255
 *               thumnail_url:
 *                 type: string
 *                 maxLength: 255
 *               mobile_url:
 *                 type: string
 *                 maxLength: 255
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RefPaparanPengumuman'
 *       "404":
 *         description: Not found
 *   delete:
 *     summary: Delete a reference announcement display
 *     tags: [RefPaparanPengumuman]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Announcement display ID
 *     responses:
 *       "204":
 *         description: No content
 *       "404":
 *         description: Not found
 */

router
  .route('/')
  .post(validate(refPaparanPengumumanValidation.createRefPaparanPengumuman), refPaparanPengumumanController.createRefPaparanPengumuman)
  .get(validate(refPaparanPengumumanValidation.getRefPaparanPengumumans), refPaparanPengumumanController.getRefPaparanPengumumans);

router
  .route('/:id')
  .get(validate(refPaparanPengumumanValidation.getRefPaparanPengumuman), refPaparanPengumumanController.getRefPaparanPengumuman)
  .patch(validate(refPaparanPengumumanValidation.updateRefPaparanPengumuman), refPaparanPengumumanController.updateRefPaparanPengumuman)
  .put(validate(refPaparanPengumumanValidation.replaceRefPaparanPengumuman), refPaparanPengumumanController.replaceRefPaparanPengumuman)
  .delete(validate(refPaparanPengumumanValidation.deleteRefPaparanPengumuman), refPaparanPengumumanController.deleteRefPaparanPengumuman);

module.exports = router;