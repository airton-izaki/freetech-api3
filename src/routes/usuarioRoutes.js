const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController'); // corrigido
const autenticarToken = require('../middleware/authMiddleware'); // verifique se o caminho está certo
const validate = require('../middleware/validate');
const { criarUsuarioSchema, atualizarUsuarioSchema } = require('../validations/usuarioValidation');

// Rotas públicas
router.post('/', validate(criarUsuarioSchema()), usuarioController.criar);

// Rotas protegidas
router.get('/', autenticarToken, usuarioController.listar);
router.get('/:id', autenticarToken, usuarioController.buscar);
router.put('/:id', autenticarToken, validate(atualizarUsuarioSchema()), usuarioController.atualizar);
router.delete('/:id', autenticarToken, usuarioController.remover);

module.exports = router;

