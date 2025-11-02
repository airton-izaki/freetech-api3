const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const Tarefa = require('../../src/models/tarefaModel');
const jwt = require('jsonwebtoken');

// Mock de usuário
const usuarioMock = {
  id: new mongoose.Types.ObjectId(),
  perfil: 'empresa'
};

// Gera token válido para autenticação
const token = jwt.sign(usuarioMock, process.env.JWT_SECRET, { expiresIn: '1h' });

beforeAll(async () => {
  // Conecta ao banco de testes (ex: banco temporário)
  const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DBNAME}_test`;
  await mongoose.connect(uri);
});

afterAll(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
  await mongoose.connection.close();
});

describe('✅ Testes CRUD de Tarefas', () => {
  let tarefaId;

  test('POST /api/tarefa - Deve criar uma nova tarefa', async () => {
    const novaTarefa = {
      titulo: 'Tarefa de teste',
      descricao: 'Descrição da tarefa de teste',
      status: 'pendente'
    };

    const res = await request(app)
      .post('/api/tarefa')
      .set('Authorization', `Bearer ${token}`)
      .send(novaTarefa);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.titulo).toBe('Tarefa de teste');
    tarefaId = res.body._id;
  });

  test('GET /api/tarefa - Deve listar todas as tarefas do usuário', async () => {
    const res = await request(app)
      .get('/api/tarefa')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('GET /api/tarefa/:id - Deve buscar tarefa específica', async () => {
    const res = await request(app)
      .get(`/api/tarefa/${tarefaId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id', tarefaId);
  });

  test('PUT /api/tarefa/:id - Deve atualizar uma tarefa', async () => {
    const res = await request(app)
      .put(`/api/tarefa/${tarefaId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'concluida' });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('concluida');
  });

  test('DELETE /api/tarefa/:id - Deve excluir uma tarefa', async () => {
    const res = await request(app)
      .delete(`/api/tarefa/${tarefaId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Tarefa excluída com sucesso');
  });
});
