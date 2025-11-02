const Joi = require('joi');

function criarUsuarioSchema() {
  return Joi.object({
    nome: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    senha: Joi.string().min(6).max(128).required(),
    perfil: Joi.string().required(),
  });
};

function loginSchema() {
  return Joi.object({
    email: Joi.string().email().required(),
    senha: Joi.string().min(6).max(128).required(),
  });
};

function atualizarUsuarioSchema() {
  return Joi.object({
    nome: Joi.string().min(2).max(100),
    email: Joi.string().email(),
    senha: Joi.string().min(6).max(128),
  }).min(1);
};

module.exports = {
  criarUsuarioSchema,
  loginSchema,
  atualizarUsuarioSchema,
};
