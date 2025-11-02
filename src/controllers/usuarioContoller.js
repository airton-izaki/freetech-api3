const Usuario = require('../models/usuarioModel');

// Criar novo usuário
async function criar(req, res) {
  try {
    const usuario = await Usuario.create(req.body);
    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar usuário', error: error.message });
  }
}

// Listar todos os usuários
async function listar(req, res) {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuários', error: error.message });
  }
}

// Buscar usuário por ID
async function buscar(req, res) {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuário', error: error.message });
  }
}

// Atualizar usuário
async function atualizar(req, res) {
  try {
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar usuário', error: error.message });
  }
}

// Excluir usuário
async function remover(req, res) {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json({ message: 'Usuário excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir usuário', error: error.message });
  }
}

module.exports = {  criar,  listar,  buscar,  atualizar,  remover };
