const Projeto = require('../models/projetoModel');

// Criar novo projeto
const criarProjeto = async (req, res) => {
  try {
    const { nome, cliente, prazo, status } = req.body;

    if (!nome || !cliente || !prazo) {
      return res.status(400).json({ erro: 'Todos os campos obrigatórios devem ser preenchidos' });
    }

    const novoProjeto = new Projeto({ nome, cliente, prazo, status });
    await novoProjeto.save();

    res.status(201).json(novoProjeto);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar projeto', detalhes: error.message });
  }
};

// Listar todos os projetos
const listarProjetos = async (req, res) => {
  try {
    const projetos = await Projeto.find();
    res.status(200).json(projetos);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao listar projetos', detalhes: error.message });
  }
};

// Obter projeto por ID
const obterProjeto = async (req, res) => {
  try {
    const projeto = await Projeto.findById(req.params.id);
    if (!projeto) {
      return res.status(404).json({ erro: 'Projeto não encontrado' });
    }
    res.status(200).json(projeto);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar projeto', detalhes: error.message });
  }
};

// Atualizar projeto
const atualizarProjeto = async (req, res) => {
  try {
    const { nome, cliente, prazo, status } = req.body;
    const projetoAtualizado = await Projeto.findByIdAndUpdate(
      req.params.id,
      { nome, cliente, prazo, status },
      { new: true, runValidators: true }
    );

    if (!projetoAtualizado) {
      return res.status(404).json({ erro: 'Projeto não encontrado' });
    }

    res.status(200).json(projetoAtualizado);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar projeto', detalhes: error.message });
  }
};

// Deletar projeto
const deletarProjeto = async (req, res) => {
  try {
    const projetoDeletado = await Projeto.findByIdAndDelete(req.params.id);
    if (!projetoDeletado) {
      return res.status(404).json({ erro: 'Projeto não encontrado' });
    }
    res.status(200).json({ mensagem: 'Projeto deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao deletar projeto', detalhes: error.message });
  }
};

module.exports = {
  criarProjeto,
  listarProjetos,
  obterProjeto,
  atualizarProjeto,
  deletarProjeto
};
