const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioContoller');
const autenticarToken = require('../middleware/authMiddleware');

// Rotas públicas (se quiser permitir registro sem autenticação)
router.post('/', usuarioController.criar);

// Rotas protegidas
router.get('/', autenticarToken, usuarioController.listar);
router.get('/:id', autenticarToken,  usuarioController.buscar);
router.put('/:id',  autenticarToken, usuarioController.atualizar);
router.delete('/:id',  autenticarToken,  usuarioController.remover);

module.exports = router;
