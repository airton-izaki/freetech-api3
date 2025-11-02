const Usuario = require('../models/usuarioModel');
const ApiError = require('../errors/ApiError');

// Criar usuário
async function criar(req, res, next) {
  try {
    const { nome, email, senha, perfil } = req.body;

    // Checar se email já existe
    const existente = await Usuario.findOne({ email });
    if (existente) {
      return next(new ApiError('Email já cadastrado', 409, null, 'EMAIL_EXISTS'));
    }

    const usuario = new Usuario({ nome, email, senha, perfil });
    await usuario.save();

    return res.status(201).json({
      data: { id: usuario._id, nome: usuario.nome, email: usuario.email, perfil: usuario.perfil }
    });
  } catch (err) {
    return next(err);
  }
}

// Listar todos os usuários
async function listar(req, res, next) {
  try {
    const usuarios = await Usuario.find({}, 'nome email perfil');
    return res.json({ data: usuarios });
  } catch (err) {
    return next(err);
  }
}

// Buscar usuário por ID
async function buscar(req, res, next) {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findById(id, 'nome email perfil');
    if (!usuario) {
      return next(new ApiError('Usuário não encontrado', 404, null, 'USER_NOT_FOUND'));
    }
    return res.json({ data: usuario });
  } catch (err) {
    return next(err);
  }
}

// Atualizar usuário
async function atualizar(req, res, next) {
  try {
    const { id } = req.params;
    const updates = req.body;

    const usuario = await Usuario.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!usuario) {
      return next(new ApiError('Usuário não encontrado', 404, null, 'USER_NOT_FOUND'));
    }

    return res.json({ data: usuario });
  } catch (err) {
    return next(err);
  }
}

// Remover usuário
async function remover(req, res, next) {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByIdAndDelete(id);
    if (!usuario) {
      return next(new ApiError('Usuário não encontrado', 404, null, 'USER_NOT_FOUND'));
    }

    return res.json({ data: { message: 'Usuário removido com sucesso' } });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  criar,
  listar,
  buscar,
  atualizar,
  remover
};
