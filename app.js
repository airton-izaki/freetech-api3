require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const tarefaRoutes = require('./src/routes/tarefaRoutes');
const authRoutes = require('./src/routes/authRoutes');
//const mongoose = require('mongoose');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const routes = require('./src/routes/index');
const usuarioRoutes = require('./src/routes/usuarioRoutes');

app.use('/api/usuario', usuarioRoutes);
app.use('/api/tarefa', tarefaRoutes);
app.use('/api/auth', authRoutes);

// Variável de ambiente para URL do banco (defina no .env)
const url = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DBNAME}`;

/**
mongoose
  .connect(url)
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.log("Erro ao conectar ao MongoDB", err.message));
*/
//const indexRouter = require('./routes/index');
//const usersRouter = require('./routes/users');
//app.use(express.static(path.join(__dirname, 'public')));
//app.use('/', indexRouter);
//app.use('/users', usersRouter);

module.exports = app;
