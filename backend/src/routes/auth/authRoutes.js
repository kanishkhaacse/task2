const express = require('express');
const router = express.Router();
const { loginUser } = require('../../controllers/auth/authController');

// Route to handle user login
router.post('/login', loginUser);

module.exports = router;
