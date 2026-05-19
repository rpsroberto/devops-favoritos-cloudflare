# DevOps Favoritos Cloudflare

Plataforma full stack para clientes salvarem produtos favoritos para futuras compras. O projeto foi criado para uma atividade prática de DevOps, com API REST, frontend, banco PostgreSQL, Prisma, Docker Compose, GitHub Actions e preparação para deploy no Cloudflare Pages.

## Tecnologias

- Frontend: React, Vite e TypeScript
- Backend: Node.js, Express e TypeScript
- Banco de dados: PostgreSQL
- ORM: Prisma
- API externa: Fake Store API
- Containers: Docker e Docker Compose
- CI/CD: GitHub Actions
- Deploy: Cloudflare Pages para frontend e Render para backend

## Arquitetura

```text
devops-favoritos-cloudflare/
├── backend/
│   ├── src/controllers/
│   ├── src/routes/
│   ├── src/services/
│   ├── src/repositories/
│   ├── src/middlewares/
│   ├── src/prisma/
│   └── prisma/
├── frontend/
│   └── src/
├── .github/workflows/
├── docker-compose.yml
└── README.md
```

O backend concentra as regras de negócio em services, o acesso a dados em repositories e a entrada HTTP em controllers. O frontend consome a API local do backend, que também funciona como camada intermediária para buscar produtos da Fake Store API.

## Funcionalidades

- Criar, listar, editar e remover clientes
- Bloquear e-mail duplicado para clientes
- Listar produtos da Fake Store API
- Adicionar produto favorito para um cliente
- Bloquear favorito duplicado para o mesmo cliente
- Listar favoritos por cliente com título, imagem, preço e avaliação
- Remover favorito
- Interface responsiva com rodapé contendo o nome da equipe

## Rotas da API

### Saúde

| Método | Rota | Descrição |
| --- | --- | --- |
| GET | `/health` | Verifica se a API está online |

### Clientes

| Método | Rota | Descrição |
| --- | --- | --- |
| POST | `/clients` | Cria cliente |
| GET | `/clients` | Lista clientes |
| GET | `/clients/:id` | Busca cliente por ID |
| PUT | `/clients/:id` | Atualiza cliente |
| DELETE | `/clients/:id` | Remove cliente |

Payload para criar ou editar cliente:

```json
{
  "name": "Maria Silva",
  "email": "maria@email.com"
}
```

### Produtos

| Método | Rota | Descrição |
| --- | --- | --- |
| GET | `/products` | Lista produtos vindos da Fake Store API |

### Favoritos

| Método | Rota | Descrição |
| --- | --- | --- |
| POST | `/clients/:clientId/favorites` | Adiciona favorito |
| GET | `/clients/:clientId/favorites` | Lista favoritos do cliente |
| DELETE | `/clients/:clientId/favorites/:productId` | Remove favorito |

Payload para adicionar favorito:

```json
{
  "productId": 1
}
```

## Pré-requisitos

- Node.js 20+
- Docker e Docker Compose
- Git
- Conta no GitHub
- Conta no Cloudflare

## Como clonar

```bash
git clone https://github.com/rpsroberto/devops-favoritos-cloudflare.git
cd devops-favoritos-cloudflare
```

## Configuração de ambiente

Backend:

```bash
cp backend/.env.example backend/.env
```

Frontend:

```bash
cp frontend/.env.example frontend/.env
```

Variáveis principais:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/devops_favoritos?schema=public"
PORT=3333
FRONTEND_URL="http://localhost:5173"
FAKE_STORE_API_URL="https://fakestoreapi.com"
VITE_API_URL="http://localhost:3333"
```

## Rodando com Docker

Na raiz do projeto:

```bash
docker compose up --build
```

Acessos locais:

- Frontend: http://localhost:5173
- Backend: http://localhost:3333
- Health check: http://localhost:3333/health
- PostgreSQL: localhost:5432

O container do backend executa `prisma migrate deploy` antes de iniciar a API.

## Rodando sem Docker

Suba um PostgreSQL local e configure `backend/.env`.

Backend:

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

Se preferir instalação estritamente baseada no `package-lock.json`:

```bash
npm ci
npx prisma generate
npx prisma migrate dev
npm run dev
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

## Migrations do Prisma

Criar nova migration após alterar `backend/prisma/schema.prisma`:

```bash
cd backend
npx prisma migrate dev --name nome_da_migration
```

Aplicar migrations em produção:

```bash
cd backend
npx prisma migrate deploy
```

Abrir Prisma Studio:

```bash
cd backend
npx prisma studio
```

## GitHub Actions

O workflow fica em `.github/workflows/ci-cd.yml` e executa:

1. Checkout do repositório
2. Configuração do Node.js 20
3. Instalação de dependências do backend
4. Geração do Prisma Client
5. Build TypeScript do backend
6. Instalação de dependências do frontend
7. Build de produção do frontend
8. Deploy automático do frontend no Cloudflare Pages quando houver push na branch `main`

Secrets necessários para deploy:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `VITE_API_URL`

Para este projeto, o `CLOUDFLARE_ACCOUNT_ID` usado no Cloudflare Pages é:

```text
4f6c66c31f45f759c221baad6ef5b1bd
```

## Deploy no Cloudflare Pages

1. Crie uma conta em https://dash.cloudflare.com.
2. Acesse Workers & Pages.
3. Crie um projeto do tipo Pages.
4. Conecte o repositório `devops-favoritos-cloudflare`.
5. Configure:
   - Framework preset: Vite
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `frontend`
6. Configure a variável:
   - `VITE_API_URL`: `/api`
7. Faça o deploy.

O frontend publicado usa um proxy em `frontend/public/_worker.js`. Assim, o navegador chama `/api` no próprio domínio do Cloudflare Pages, e o Cloudflare encaminha a requisição para o backend no Render.

Domínio:

- Use o domínio gratuito `*.pages.dev` criado pelo Cloudflare.
- Opcionalmente, configure um domínio próprio em Custom Domains.

Monitoramento:

- Ative Cloudflare Web Analytics para métricas de acesso.
- Use os logs de deploy do Pages para investigar falhas de build.
- Para Workers, use Workers Observability e logs em tempo real.

## Backend em produção

Para apresentação acadêmica, a alternativa mais simples é publicar o backend no Render:

1. Crie um banco PostgreSQL no Render.
2. Crie um Web Service apontando para o diretório `backend`.
3. Configure:
   - Build command: `npm install && npx prisma generate && npm run build`
   - Start command: `npx prisma migrate deploy && npm run start`
4. Configure variáveis:
   - `DATABASE_URL`
   - `PORT`
   - `FRONTEND_URL`
   - `FAKE_STORE_API_URL`

Alternativa com Cloudflare Workers:

- Express tradicional não roda diretamente em Workers sem adaptação.
- Para Workers, o backend pode ser migrado para Hono ou itty-router.
- O PostgreSQL deve ficar externo, usando Neon, Supabase ou outro banco serverless.
- O Prisma em Workers exige Prisma Accelerate ou driver compatível com ambiente edge.

## Docker

Serviços definidos no `docker-compose.yml`:

- `postgres`: banco PostgreSQL 16
- `backend`: API Express com Prisma
- `frontend`: React/Vite

Comando principal:

```bash
docker compose up --build
```

Parar containers:

```bash
docker compose down
```

Parar e remover volume do banco:

```bash
docker compose down -v
```

## Organização no GitHub

Nome sugerido do repositório:

```text
devops-favoritos-cloudflare
```

Branch principal:

```text
main
```

Sugestão de commits:

```text
feat: estrutura inicial do projeto
feat: criação da API de clientes
feat: integração com Fake Store API
feat: gerenciamento de favoritos
feat: criação do frontend
chore: configuração docker
ci: configuração github actions
docs: atualização do README
```

## Prints

Adicione aqui os prints após rodar a aplicação:

- Tela de clientes
- Catálogo de produtos
- Lista de favoritos
- Pipeline no GitHub Actions
- Deploy no Cloudflare Pages

## Links finais

- Repositório GitHub: https://github.com/rpsroberto/devops-favoritos-cloudflare
- Aplicação publicada: https://devops-favoritos-cloudflare.pages.dev
- Deploy de produção criado: https://9f6a4c6a.devops-favoritos-cloudflare.pages.dev

## Equipe

Equipe DevOps Favoritos
