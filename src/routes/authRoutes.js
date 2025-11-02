const express = require('express');
const router = express.Router();
const authController = require('../controllers/authcontroller');

// Rota de registro (opcional)
router.post('/register', authController.registrar);

// Rota de login
router.post('/login', authController.login);

module.exports = router;
