# Instruções de Instalação - Backend Todo List

## Pré-requisitos

- Node.js (versão 18+)
- PostgreSQL instalado e rodando
- Git instalado

## Configuração do Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/gabrielsantr/back-end-mega-todo-list.git
cd back-end-mega-todo-list
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
JWT_SECRET="sua_chave_secreta_super_segura_aqui"
PORT=3000
```

> Substitua `usuario`, `senha` e `nome_do_banco` pelas suas credenciais do PostgreSQL

### 4. Configure o banco de dados

```bash
# Executar migrations (criar tabelas)
npx prisma migrate deploy

# Gerar cliente do Prisma
npx prisma generate
```

### 5. Execute o projeto

```bash
# Modo desenvolvimento (recomendado)
npm run dev

# OU compilar e executar em produção
npm run build
npm start
```

## Verificação

Se tudo estiver correto, você verá:

```text
Servidor rodando na porta 3000
```

Teste uma requisição:

```text
GET http://localhost:3000/tasks
```

> Deve retornar erro de autenticação (401), o que é normal pois as rotas precisam de login.

## Scripts Disponíveis

- `npm run dev` - Desenvolvimento com hot reload
- `npm run build` - Compilar TypeScript
- `npm start` - Executar versão compilada

## Possíveis Problemas

### Erro de conexão com banco

- Verifique se o PostgreSQL está rodando
- Confirme as credenciais no arquivo `.env`

### Erro "prisma generate"

```bash
npm install @prisma/client
npx prisma generate
```

### Porta já em uso

- Altere a `PORT` no arquivo `.env`
- Ou finalize o processo que está usando a porta 3000

## Endpoints Principais

- `POST /users/register` - Cadastro de usuário
- `POST /users/login` - Login
- `GET /tasks` - Listar tarefas
- `POST /tasks` - Criar tarefa
- `PUT /tasks/:id` - Atualizar tarefa
- `DELETE /tasks/:id` - Deletar tarefa
- `DELETE /tasks?completed=true` - Deletar todas as concluídas

> Todas as rotas de tasks precisam de autenticação (token JWT)
