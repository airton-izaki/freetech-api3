const mongoose = require('mongoose');

const projetoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'O nome do projeto é obrigatório']
  },
  cliente: {
    type: String,
    required: [true, 'O nome do cliente é obrigatório']
  },
  prazo: {
    type: Date,
    required: [true, 'O prazo do projeto é obrigatório']
  },
  status: {
    type: String,
    enum: ['pendente', 'em andamento', 'concluído'],
    default: 'pendente'
  }
}, { timestamps: true });

const Projeto = mongoose.model('Projeto', projetoSchema);

module.exports = Projeto;
