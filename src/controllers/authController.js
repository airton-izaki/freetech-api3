require('../models/usuarioModel'); 
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcryptjs'); 
require('dotenv').config(); 

//Função registrar
async function registrar(req, res) { 
    try { 
        const { nome, email, senha, perfil } = req.body;
        
        // Verifica se já existe um usuário com esse email
        const emailExistente = await Usuario.findOne({ email });
        if (emailExistente) {
            return res.status(400).json({ erro: 'Email já cadastrado' });
        }

        // Criptografa a senha
        const senhaCriptografada = await bcrypt.hash(senha, 10);
        
        // Cria o usuário
        const novoUsuario = await Usuario.create({ 
            nome, email, 
            senha: senhaCriptografada, 
            perfil 
        });
        
        // Retorna apenas os dados públicos
        res.status(201).json({ 
            id: novoUsuario._id, 
            nome: novoUsuario.nome, 
            email: novoUsuario.email, 
            perfil: novoUsuario.perfil 
        });
    } catch (err) {
             res.status(500).json({ erro: 'Erro ao registrar usuário', detalhes: err.message }); } 
    };

// Função login
async function login(req, res) { 
    try { const { email, senha } = req.body; 
        const usuario = await Usuario.findOne({ email }); 
        if (!usuario) 
            return res.status(404).json({ erro: 'Usuário não encontrado' }); 
        const senhaValida = await bcrypt.compare(senha, usuario.senha); 
        if (!senhaValida) 
            return res.status(401).json({ erro: 'Senha inválida' }); 
        
        const token = jwt.sign({ 
            id: usuario._id, 
            perfil: usuario.perfil 
        }, 
        process.env.JWT_SECRET, { 
            expiresIn: '15m' 
        }); 
        res.json({ token }); 
    } catch (err) { 
        res.status(500).json({ erro: 'Erro ao fazer login', detalhes: err.message }); } 
    } 
    
    module.exports = { registrar, login };

