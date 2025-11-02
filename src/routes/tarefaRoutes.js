const express = require('express');
const router = express.Router();
const tarefaController = require('../controllers/tarefaController');
const autenticar = require('../middleware/authmiddleware');

// Rotas protegidas
router.post('/', autenticar, tarefaController.criar);
router.get('/', autenticar, tarefaController.listar);
router.get('/:id', autenticar, tarefaController.buscar);
router.put('/:id', autenticar, tarefaController.atualizar);
router.delete('/:id', autenticar, tarefaController.remover);

module.exports = router;
