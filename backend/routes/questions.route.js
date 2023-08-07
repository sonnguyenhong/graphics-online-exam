const express = require('express');
const router = express.Router();
const QuestionController = require('../controllers/questions.controller');

router.get('/', QuestionController.getAllQuestion);
router.post('/compute-result', QuestionController.evalResult);

module.exports = router;
