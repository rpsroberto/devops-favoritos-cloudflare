# CopaTrade

Plataforma full stack para colecionadores de figurinhas da Copa cadastrarem figurinhas desejadas, repetidas e encontrarem possíveis trocas online. O projeto mantém a proposta prática de DevOps com API REST, frontend, PostgreSQL, Prisma, Docker Compose, GitHub Actions, backend no Render e frontend no Cloudflare Pages.

## Tecnologias

- Frontend: React, Vite e TypeScript
- Backend: Node.js, Express e TypeScript
- Banco de dados: PostgreSQL
- ORM: Prisma
- Containers: Docker e Docker Compose
- CI/CD: GitHub Actions
- Deploy frontend: Cloudflare Pages
- Deploy backend: Render

## Arquitetura

```text
devops-favoritos-cloudflare/
├── backend/
│   ├── src/controllers/
│   ├── src/routes/
│   ├── src/services/
│   ├── src/repositories/
│   ├── src/middlewares/
│   └── prisma/
├── frontend/
│   ├── public/_worker.js
│   └── src/
├── .github/workflows/
├── docker-compose.yml
└── README.md
```

O frontend publicado no Cloudflare Pages chama `/api`. A função `frontend/public/_worker.js` atua como proxy e encaminha essas chamadas para o backend no Render.

Algumas imagens do catálogo usam URLs públicas de produtos oficiais da Panini como referência visual acadêmica/demonstrativa. As figurinhas de jogadores continuam simuladas para evitar cópia indevida de cromos oficiais.

## Funcionalidades

- Criar, listar, editar e remover colecionadores
- Bloquear e-mail duplicado para colecionadores
- Listar catálogo local de figurinhas da Copa com referências visuais oficiais da Panini
- Marcar figurinhas desejadas por colecionador
- Marcar figurinhas repetidas para troca
- Remover figurinhas das listas
- Gerar sugestões de troca entre colecionadores
- Interface responsiva com rodapé da equipe

## Modelagem

### Collector

- `id`
- `name`
- `email`
- `city`
- `createdAt`
- `updatedAt`

Regra: `email` é único.

### StickerItem

- `id`
- `collectorId`
- `stickerCode`
- `type`: `WANTED` ou `DUPLICATE`
- `createdAt`

Regra: a combinação `collectorId + stickerCode + type` é única.

## Rotas da API

### Saúde

| Método | Rota | Descrição |
| --- | --- | --- |
| GET | `/health` | Verifica se a API está online |

### Colecionadores

| Método | Rota | Descrição |
| --- | --- | --- |
| POST | `/collectors` | Cria colecionador |
| GET | `/collectors` | Lista colecionadores |
| GET | `/collectors/:id` | Busca colecionador por ID |
| PUT | `/collectors/:id` | Atualiza colecionador |
| DELETE | `/collectors/:id` | Remove colecionador |

Payload:

```json
{
  "name": "Roberto Sousa",
  "email": "roberto@email.com",
  "city": "Fortaleza"
}
```

### Figurinhas

| Método | Rota | Descrição |
| --- | --- | --- |
| GET | `/stickers` | Lista figurinhas do álbum |

### Desejadas

| Método | Rota | Descrição |
| --- | --- | --- |
| POST | `/collectors/:collectorId/wanted` | Adiciona figurinha desejada |
| GET | `/collectors/:collectorId/wanted` | Lista desejadas do colecionador |
| DELETE | `/collectors/:collectorId/wanted/:stickerCode` | Remove desejada |

Payload:

```json
{
  "stickerCode": "BRA-10"
}
```

### Repetidas

| Método | Rota | Descrição |
| --- | --- | --- |
| POST | `/collectors/:collectorId/duplicates` | Adiciona figurinha repetida |
| GET | `/collectors/:collectorId/duplicates` | Lista repetidas do colecionador |
| DELETE | `/collectors/:collectorId/duplicates/:stickerCode` | Remove repetida |

### Trocas

| Método | Rota | Descrição |
| --- | --- | --- |
| GET | `/matches` | Lista possíveis trocas entre colecionadores |

## Pré-requisitos

- Node.js 20+
- Docker e Docker Compose
- Git
- Conta no GitHub
- Conta no Cloudflare
- Conta no Render

## Como clonar

```bash
git clone https://github.com/rpsroberto/devops-favoritos-cloudflare.git
cd devops-favoritos-cloudflare
```

## Variáveis de ambiente

Backend:

```bash
cp backend/.env.example backend/.env
```

Frontend:

```bash
cp frontend/.env.example frontend/.env
```

Backend:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/devops_favoritos?schema=public"
PORT=3333
FRONTEND_URL="http://localhost:5173"
```

Frontend local:

```env
VITE_API_URL="http://localhost:3333"
```

Frontend publicado no Cloudflare Pages:

```env
VITE_API_URL="/api"
```

## Rodando com Docker

```bash
docker compose up --build
```

Acessos locais:

- Frontend: http://localhost:5173
- Backend: http://localhost:3333
- Health check: http://localhost:3333/health
- PostgreSQL: localhost:5432

## Rodando sem Docker

Backend:

```bash
cd backend
npm ci
npx prisma generate
npx prisma migrate dev
npm run dev
```

Frontend:

```bash
cd frontend
npm ci
npm run dev
```

## Migrations do Prisma

Criar migration:

```bash
cd backend
npx prisma migrate dev --name nome_da_migration
```

Aplicar migrations em produção:

```bash
cd backend
npx prisma migrate deploy
```

## GitHub Actions

O workflow em `.github/workflows/ci-cd.yml` executa:

1. Checkout
2. Setup Node.js 20
3. Instalação do backend
4. Geração do Prisma Client
5. Build do backend
6. Instalação do frontend
7. Build do frontend
8. Deploy do frontend no Cloudflare Pages em push na `main`

Secrets usados:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `VITE_API_URL`

## Deploy

### Frontend Cloudflare Pages

- Projeto: `devops-favoritos-cloudflare`
- Root directory: `frontend`
- Build command: `npm run build`
- Build output directory: `dist`
- Variável de produção: `VITE_API_URL=/api`

URL publicada:

```text
https://devops-favoritos-cloudflare.pages.dev
```

### Backend Render

- Serviço: `devops-favoritos-api`
- Root directory: `backend`
- Build command: `npm ci && npx prisma generate && npm run build`
- Start command: `npx prisma migrate deploy && npm run start`

Variáveis:

- `DATABASE_URL`
- `PORT=3333`
- `FRONTEND_URL=https://devops-favoritos-cloudflare.pages.dev`

Health:

```text
https://devops-favoritos-api.onrender.com/health
```

## Organização no GitHub

Repositório:

```text
https://github.com/rpsroberto/devops-favoritos-cloudflare
```

Branch principal:

```text
main
```

Sugestão de commits:

```text
feat: estrutura inicial do projeto
feat: cadastro de colecionadores
feat: catalogo de figurinhas
feat: listas de desejadas e repetidas
feat: sugestoes de troca
chore: configuracao docker
ci: configuracao github actions
docs: atualizacao do readme
```

## Prints

Espaço para prints:

- Cadastro de colecionadores
- Álbum de figurinhas
- Lista de desejadas
- Lista de repetidas
- Sugestões de troca
- Pipeline verde no GitHub Actions
- Deploy no Cloudflare Pages

## Equipe

Equipe CopaTrade
