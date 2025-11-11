const express = require('express');
const validate = require('../../middlewares/validate');
const pertanyaanValidation = require('../../validations/pertanyaan.validation');
const pertanyaanController = require('../../controllers/pertanyaan.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(pertanyaanValidation.createPertanyaan), pertanyaanController.createPertanyaan)
  .get(validate(pertanyaanValidation.getPertanyaans), pertanyaanController.getPertanyaans);

router
  .route('/:id')
  .get(validate(pertanyaanValidation.getPertanyaan), pertanyaanController.getPertanyaan)
  .patch(validate(pertanyaanValidation.updatePertanyaan), pertanyaanController.updatePertanyaan)
  .delete(validate(pertanyaanValidation.deletePertanyaan), pertanyaanController.deletePertanyaan);

router
  .route('/:id/answer')
  .post(validate(pertanyaanValidation.answerPertanyaan), pertanyaanController.answerPertanyaan);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Pertanyaan
 *   description: Public inquiries management
 */

/**
 * @swagger
 * /pertanyaan:
 *   post:
 *     summary: Submit a question/inquiry
 *     tags: [Pertanyaan]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - phone_no
 *               - email
 *               - kod_kategori_pertanyaan
 *               - question
 *             properties:
 *               name:
 *                 type: string
 *               phone_no:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               kod_kategori_pertanyaan:
 *                 type: string
 *                 maxLength: 5
 *               question:
 *                 type: string
 *             example:
 *               name: "Ahmad bin Ali"
 *               phone_no: "0123456789"
 *               email: "ahmad@example.com"
 *               kod_kategori_pertanyaan: "GEN01"
 *               question: "How do I apply for burial permit?"
 *     responses:
 *       "201":
 *         description: Created
 *       "400":
 *         description: Bad Request
 *
 *   get:
 *     summary: Get all questions
 *     tags: [Pertanyaan]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [N, A]
 *         description: Question status (N=New, A=Answered)
 *       - in: query
 *         name: kod_kategori_pertanyaan
 *         schema:
 *           type: string
 *         description: Category code
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Inquirer name
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Inquirer email
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
 *         description: Maximum number of questions
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
 * /pertanyaan/{id}:
 *   get:
 *     summary: Get a question
 *     tags: [Pertanyaan]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Question id
 *     responses:
 *       "200":
 *         description: OK
 *       "404":
 *         description: Not found
 *
 *   patch:
 *     summary: Update a question
 *     tags: [Pertanyaan]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Question id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone_no:
 *                 type: string
 *               email:
 *                 type: string
 *               question:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [N, A]
 *             example:
 *               question: "Updated question text"
 *     responses:
 *       "200":
 *         description: OK
 *       "404":
 *         description: Not found
 *
 *   delete:
 *     summary: Delete a question
 *     tags: [Pertanyaan]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Question id
 *     responses:
 *       "204":
 *         description: No content
 *       "404":
 *         description: Not found
 */

/**
 * @swagger
 * /pertanyaan/{id}/answer:
 *   post:
 *     summary: Answer a question
 *     tags: [Pertanyaan]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Question id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - notes
 *             properties:
 *               notes:
 *                 type: string
 *             example:
 *               notes: "You can apply for burial permit by visiting our office with required documents."
 *     responses:
 *       "200":
 *         description: OK
 *       "400":
 *         description: Bad Request
 *       "404":
 *         description: Not found
 */