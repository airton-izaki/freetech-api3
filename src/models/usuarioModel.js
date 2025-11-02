const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nome: { 
        type: String, 
        required: true,
        minlength: 3
    },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'E-mail inválido'] 
    },
    senha: { 
        type: String, 
        required: true,
        minlength: 6
    },
    perfil: { type: String, 
        enum: ['freelancer', 'empresa'], required: true },
}, {
    timestamps: true
});
module.exports = mongoose.model('Usuario', usuarioSchema);
