require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Documentação swagger
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

const tarefaRoutes = require('./src/routes/tarefaRoutes');
const authRoutes = require('./src/routes/authRoutes');
const errorHandler = require('./src/middleware/errorHandler');

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


// middleware de 404 simples
app.use((req, res, next) => {
res.status(404).json({ error: { message: 'Not Found' } });
});

// middleware global de erros, deve ser o último
app.use(errorHandler);


// Rota da documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Variável de ambiente para URL do banco (defina no .env)
const url = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DBNAME}`;

module.exports = app;
