const Tarefa = require('../models/tarefaModel');

// Criar nova tarefa
async function criar(req, res) {
    try {
        const tarefa = await Tarefa.create({ ...req.body, usuario: req.usuario.id });
        res.status(201).json(tarefa);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao criar tarefa', error: error.message });
    }
}

// Listar tarefas do usuário
async function listar(req, res) {
    try {
        const tarefas = await Tarefa.find({ usuario: req.usuario.id });
        res.status(200).json(tarefas);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar tarefas', error: error.message });
    }
}

// Buscar tarefa por ID
async function buscar(req, res) {
    try {
        const tarefa = await Tarefa.findOne({ _id: req.params.id, usuario: req.usuario.id });
        if (!tarefa) return res.status(404).json({ message: 'Tarefa não encontrada' });
        res.status(200).json(tarefa);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar tarefa', error: error.message });
    }
}

// Atualizar tarefa
async function atualizar(req, res) {
    try {
        const tarefa = await Tarefa.findOneAndUpdate(
            { _id: req.params.id, usuario: req.usuario.id },
            req.body,
            { new: true }
        );
        if (!tarefa) return res.status(404).json({ message: 'Tarefa não encontrada' });
        res.status(200).json(tarefa);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao atualizar tarefa', error: error.message });
    }
}

// Excluir tarefa
async function remover(req, res) {
    try {
        const tarefa = await Tarefa.findOneAndDelete({ _id: req.params.id, usuario: req.usuario.id });
        if (!tarefa) return res.status(404).json({ message: 'Tarefa não encontrada' });
        res.status(200).json({ message: 'Tarefa excluída com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir tarefa', error: error.message });
    }
}

module.exports = { criar, listar, buscar, atualizar, remover };
