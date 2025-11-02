const Joi = require('joi');

function criarTarefaSchema() {
  return Joi.object({
    titulo: Joi.string().min(1).max(200).required(),
    descricao: Joi.string().allow('').max(2000),
    status: Joi.string().valid('pendente', 'em andamento', 'concluida').default('pendente'),
    usuario: Joi.string().hex().length(24).required(),
  });
}

function atualizarTarefaSchema() {
  return Joi.object({
    titulo: Joi.string().min(1).max(200),
    descricao: Joi.string().allow('').max(2000),
    status: Joi.string().valid('pendente', 'em andamento', 'concluida'),
  }).min(1);
}

module.exports = {
  criarTarefaSchema,
  atualizarTarefaSchema,
};
