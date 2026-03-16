const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const interviewController = require("../controllers/interview.controller")
const upload = require('../middlewares/file.middleware');
 
const router = express.Router();

router.post('/', authMiddleware.authUserMiddleware, upload.single('resume'), interviewController.generateInterViewReportController);

module.exports = router;