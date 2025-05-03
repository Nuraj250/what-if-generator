const express = require('express');
const router = express.Router();
const { generateWhatIf } = require('../controllers/generateWhatIfController');

// POST /api/what-if
router.post('/', generateWhatIf);

module.exports = router;
