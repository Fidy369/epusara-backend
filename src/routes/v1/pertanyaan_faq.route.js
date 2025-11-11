const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const pertanyaanFaqValidation = require('../../validations/pertanyaan_faq.validation');
const pertanyaanFaqController = require('../../controllers/pertanyaan_faq.controller');

const router = express.Router();

router
  .route('/')
  .post(/*auth(),*/ validate(pertanyaanFaqValidation.createPertanyaanFaq), pertanyaanFaqController.createPertanyaanFaq)
  .get(/*auth(),*/ validate(pertanyaanFaqValidation.getPertanyaanFaqs), pertanyaanFaqController.getPertanyaanFaqs);

router
  .route('/:id')
  .get(/*auth(),*/ validate(pertanyaanFaqValidation.getPertanyaanFaq), pertanyaanFaqController.getPertanyaanFaq)
  .patch(/*auth(),*/ validate(pertanyaanFaqValidation.updatePertanyaanFaq), pertanyaanFaqController.updatePertanyaanFaq)
  .delete(/*auth(),*/ validate(pertanyaanFaqValidation.deletePertanyaanFaq), pertanyaanFaqController.deletePertanyaanFaq);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Pertanyaan FAQ
 *   description: FAQ management
 */

/**
 * @swagger
 * /pertanyaan_faq:
 *   post:
 *     summary: Create FAQ
 *     tags: [Pertanyaan FAQ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - kod_kategori_pertanyaan
 *               - question_ms
 *               - answer_ms
 *               - question_en
 *               - answer_en
 *             properties:
 *               kod_kategori_pertanyaan:
 *                 type: string
 *                 maxLength: 5
 *               question_ms:
 *                 type: string
 *                 maxLength: 500
 *               answer_ms:
 *                 type: string
 *                 maxLength: 1000
 *               question_en:
 *                 type: string
 *                 maxLength: 500
 *               answer_en:
 *                 type: string
 *                 maxLength: 1000
 *               order:
 *                 type: integer
 *                 minimum: 0
 *               is_active:
 *                 type: boolean
 *     responses:
 *       "201":
 *         description: Created
 *
 *   get:
 *     summary: Get all FAQs
 *     tags: [Pertanyaan FAQ]
 *     parameters:
 *       - in: query
 *         name: kod_kategori_pertanyaan
 *         schema:
 *           type: string
 *           maxLength: 5
 *       - in: query
 *         name: is_active
 *         schema:
 *           type: boolean
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

/**
 * @swagger
 * /pertanyaan_faq/{id}:
 *   get:
 *     summary: Get FAQ
 *     tags: [Pertanyaan FAQ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       "200":
 *         description: OK
 *       "404":
 *         description: Not found
 *
 *   patch:
 *     summary: Update FAQ
 *     tags: [Pertanyaan FAQ]
 *     parameters:
 *       - in: path
 *         name: id
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
 *               kod_kategori_pertanyaan:
 *                 type: string
 *                 maxLength: 5
 *               question_ms:
 *                 type: string
 *                 maxLength: 500
 *               answer_ms:
 *                 type: string
 *                 maxLength: 1000
 *               question_en:
 *                 type: string
 *                 maxLength: 500
 *               answer_en:
 *                 type: string
 *                 maxLength: 1000
 *               order:
 *                 type: integer
 *                 minimum: 0
 *               is_active:
 *                 type: boolean
 *     responses:
 *       "200":
 *         description: OK
 *       "404":
 *         description: Not found
 *
 *   delete:
 *     summary: Delete FAQ
 *     tags: [Pertanyaan FAQ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       "204":
 *         description: No content
 *       "404":
 *         description: Not found
 */