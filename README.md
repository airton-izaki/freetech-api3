# freetech-api3


1.  Dependências instaladas
    1.1. Produção
         express	    Framework para criar a API RESTful
         mongoose	    ORM para conexão e manipulação do MongoDB
         cors	        Middleware para habilitar CORS (compartilhamento de recursos entre domínios)
         dotenv	        Carregar variáveis de ambiente do arquivo .env
         bcryptjs	    Criptografia de senhas (hashing)
         jsonwebtoken	Geração e validação de tokens JWT para autenticação 
         swagger        conjunto de ferramentas para descrever, documentar e consumir APIs RESTful.
         Joi            Garantir a integridade dos dados que entram e saem do seu sistema
    1.2. Desenvolvimento.
         nodemon	Reinicia automaticamente o servidor quando arquivos são alterados
         jest   	Framework de testes unitários
         supertest	Testes de integração para endpoints HTTP
2.  Alteração no script do package.json
        "scripts": {
        "start": "node server.js",
        "dev": "nodemon server.js",
        "test": "jest --runInBand"
    }
# FreeTech - Planejamento de Issues e Tarefas

## 🧩 Issue 1

**Nome:** Configuração inicial
**Responsável:** Airton
**Descrição:** Criação do package.json, instalação de dependências e configuração do server.js.
**Tarefas:**

* Criar o arquivo `package.json` e definir scripts iniciais.
* Instalar dependências principais (`express`, `dotenv`, `cors`, `mongoose`).
* Criar o arquivo `server.js` com configuração da porta e mensagem de inicialização.
* Testar inicialização do servidor com `npm start`.

## 🧩 Issue 2

**Nome:** Conexão MongoDB
**Responsável:** Airton
**Descrição:** Implementar a conexão da API ao MongoDB Atlas.
**Tarefas:**

* Configurar variáveis de ambiente (`.env`) com usuário e senha do cluster.
* Criar módulo `db.js` para gerenciar a conexão com o MongoDB.
* Adicionar tratamento de erros e mensagens de sucesso/falha.

## 🧩 Issue 3

**Nome:** Modelo de Usuário
**Responsável:** Airton
**Descrição:** Criar o schema e as validações do modelo de usuário.
**Tarefas:**

* Criar arquivo `usuarioModel.js` dentro de `/models`.
* Definir campos obrigatórios: nome, email, senha, data de criação.
* Implementar validação de email e senha com Mongoose.
* Adicionar criptografia de senha com `bcrypt`.

## 🧩 Issue 4

**Nome:** Autenticação JWT
**Responsável:** Airton
**Descrição:** Implementar login, geração e verificação de tokens JWT.
**Tarefas:**

* Criar rota `/api/login` no `usuarioController.js`.
* Validar credenciais de usuário e senha.
* Gerar token JWT e definir tempo de expiração.
* Criar função utilitária `verifyToken()` para middleware.

## 🧩 Issue 5

**Nome:** CRUD de Tarefas
**Responsável:** Rebecca
**Descrição:** Criar rotas, controladores e integração com o banco para tarefas.
**Tarefas:**

* Criar modelo `tarefaModel.js` com campos: título, descrição, status, responsável.
* Criar rotas de criação, listagem, atualização e exclusão.
* Validar dados de entrada com middleware antes de salvar.

## 🧩 Issue 6

**Nome:** Testes de Tarefas
**Responsável:** Rebecca
**Descrição:** Implementar testes automatizados usando Jest e Supertest para o CRUD de tarefas.
**Tarefas:**

* Instalar `jest` e `supertest`.
* Criar arquivo de testes `tarefa.test.js`.
* Escrever casos de teste para rotas GET e POST.
* Rodar cobertura de testes e analisar resultados.

## 🧩 Issue 7

**Nome:** Middleware de Autenticação
**Responsável:** Rebecca
**Descrição:** Proteger rotas privadas com autenticação via token JWT.
**Tarefas:**

* Criar `authMiddleware.js` para validar o token do usuário.
* Aplicar o middleware nas rotas de tarefas e projetos.
* Testar comportamento ao usar token inválido ou ausente.

## 🧩 Issue 8

**Nome:** Documentação Swagger
**Responsável:** Rebecca
**Descrição:** Criar documentação interativa da API com Swagger UI.
**Tarefas:**

* Instalar `swagger-ui-express` e `yamljs`.
* Criar arquivo `swagger.yaml` com todos os endpoints principais.
* Integrar documentação na rota `/api-docs`.

## 🧩 Issue 9

**Nome:** Validações e Tratamento de Erros
**Responsável:** Rebecca
**Descrição:** Implementar validações de dados e middleware global de erros.
**Tarefas:**

* Criar validações com `Joi` para as principais entidades.
* Implementar `errorHandler.js` para centralizar o tratamento de erros.
* Garantir resposta padronizada de erro no formato JSON.

## 🧩 Issue 10

**Nome:** CRUD de Projetos
**Responsável:** Carlos
**Descrição:** Criar CRUD completo de projetos de freelancers.
**Tarefas:**

* Criar `projetoModel.js` e definir campos (nome, cliente, prazo, status).
* Criar `projetoController.js` com funções assíncronas.
* Criar rotas REST (`/api/projetos`).
* Validar campos obrigatórios antes de salvar no banco.

## 🧩 Issue 11

**Nome:** Configuração CORS
**Responsável:** Carlos
**Descrição:** Configurar permissões de acesso entre frontend e backend.
**Tarefas:**

* Instalar e importar o pacote `cors`.
* Permitir acesso do domínio do frontend (`https://app.freetech.com`).
* Testar requisições e verificar cabeçalhos no navegador.

## 🧩 Issue 12

**Nome:** CRUD de Freelancers
**Responsável:** Carlos
**Descrição:** Criar rotas e modelo para cadastro e gerenciamento de freelancers.
**Tarefas:**

* Criar `freelancerModel.js` com campos: nome, área, disponibilidade e nota.
* Criar controladores de CRUD (`freelancerController.js`).
* Integrar rotas no `app.js` e testar com Postman.

## 🧩 Issue 13

**Nome:** Testes Unitários
**Responsável:** Carlos
**Descrição:** Escrever testes unitários para controladores de freelancers.
**Tarefas:**

* Criar pasta `__tests__` e arquivo `freelancerController.test.js`.
* Testar funções `createFreelancer()` e `updateFreelancer()`.
* Simular erros de banco e validar respostas HTTP.

## 🧩 Issue 14

**Nome:** Integração e Documentação Final
**Responsável:** Carlos
**Descrição:** Integrar branches e documentar o projeto final.
**Tarefas:**

* Fazer merge das branches de cada membro na `develop`.
* Executar testes e corrigir conflitos antes do merge final.
* Atualizar o `README.md` com instruções de execução e endpoints.
* Gerar release final da API com tag de versão.
