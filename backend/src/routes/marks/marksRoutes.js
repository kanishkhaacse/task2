const express = require('express');
const router = express.Router();
const addController = require ("../../controllers/marks/addMarks");
const fetchController = require("../../controllers/marks/fetchMarks");
router.post('/addmarks' , addController.addMarks);
router.get('/fetchmarks' , fetchController.fetchMarks);
module.exports = router