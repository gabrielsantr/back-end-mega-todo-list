# Backend Todo List

## Configuração

**Pré-requisitos:** Node.js 18+, PostgreSQL, Git

### 1. Clone e instale

```bash
git clone https://github.com/gabrielsantr/back-end-mega-todo-list.git
cd back-end-mega-todo-list
npm install
```

### 2. Configure variáveis de ambiente

Crie um arquivo `.env`:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
JWT_SECRET="sua_chave_secreta_aqui"
PORT=3000
```

### 3. Configure banco de dados

```bash
npx prisma migrate deploy
npx prisma generate
```

### 4. Execute

```bash
# Desenvolvimento
npm run dev

# Produção
npm run build
npm start
```

## Endpoints

Todas as rotas de tasks precisam de autenticação (token JWT).

- `POST /users/register` - Cadastro
- `POST /users/login` - Login
- `GET /tasks` - Listar tarefas
- `POST /tasks` - Criar tarefa
- `PUT /tasks/:id` - Atualizar tarefa
- `DELETE /tasks/:id` - Deletar tarefa
- `DELETE /tasks?completed=true` - Deletar concluídas

## Melhorias Planejadas

Próximos passos planejados para evolução e melhoria do projeto:

- **Inversão de dependência**
  - Interfaces para repositories e services
  - Facilitar unit testing

- **Aplicar princípios SOLID**
  - Implementar os demais princípios após inversão de dependência
  - Melhorar arquitetura e manutenibilidade

- **Configurar Vitest e testes**
  - Configurar framework de testes
  - Implementar suite de testes automatizados

- **Logging estruturado**
  - Substituir console.log por winston/pino

- **Melhorar validação e error handling**
  - Validação rigorosa de entrada
  - Centralizar tratamento de erros

- **Documentação da API**
  - Especificação OpenAPI e interface Swagger

- **CI/CD e monitoramento**
  - GitHub Actions e health checks
