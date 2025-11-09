const express = require('express');
const referenceController = require('../../controllers/reference.controller');

const router = express.Router();

router.get('/burial-statuses', referenceController.getBurialStatuses);
router.get('/deceased-categories', referenceController.getDeceasedCategories);

module.exports = router;