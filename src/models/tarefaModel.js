const mongoose = require('mongoose');

const tarefaSchema = new mongoose.Schema({
    titulo: { type: String, required: true, minlength: 3 },
    descricao: { type: String, required: true },
    status: { type: String, enum: ['pendente', 'em andamento', 'concluida'], default: 'pendente' },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Tarefa', tarefaSchema);