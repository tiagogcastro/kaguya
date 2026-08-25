# AGENTS.md

Guidance for AI coding agents working in this repository.

## Project

Kaguya: learning platform (2021-2023, restored 2026) with learning trails,
lessons, content blocks, playlists, likes and role-based access. Monorepo
with three independent apps:

- `apps/backend`: Express + TypeScript REST API (Prisma 6 + PostgreSQL,
  Zod validation, disk or S3 storage driver, Firebase social login + JWT)
- `apps/next-app`: Next.js 15 pages router client (React 19, Chakra UI v2,
  Firebase modular auth, @tanstack/react-query v5)
- `apps/suggestions-microservice`: NestJS 11 GraphQL federation v2 subgraph
  for trail suggestions (Kafka available behind KAFKA_ENABLED, off by default)

## Commands

Infrastructure:

```bash
docker compose up -d   # postgres-backend on 5433, postgres-suggestions on 5434
```

Backend (`apps/backend`):

```bash
npm install
cp .env.example .env
npm run db:migrate && npm run db:seed
npm run dev:server     # port from .env PORT (3399 locally)
npm run smoke          # hits every route in dependency order
npm test               # unit + integration suites (needs docker up)
```

Web client (`apps/next-app`):

```bash
npm install
cp .env.example .env.local
npm run dev            # http://localhost:3000
npm run typecheck && npm run build
```

Microservice (`apps/suggestions-microservice`):

```bash
npm install
cp .env.example .env
npm run db:init        # prisma migrate deploy
npm run start:dev      # graphql at /graphql
npm run typecheck && npm run build
```

## Rules for agents

- Keep the base stack: Express stays Express, Chakra stays Chakra, pages
  router stays pages router. Never swap frameworks.
- Single import alias per app: `@/` maps to the src root of each app via
  tsconfig paths. No deep relative imports across modules.
- Validation happens at the edge with zod schemas in route files; controllers
  receive parsed data. Error responses use the `{ data, error }` envelope.
- Conventional Commits, one logical block per commit. Never force-push
  without owner approval. Never commit `.env`, `.env.local` or REACTIVATION.md.
- No em dashes anywhere in generated text (code, docs, commits).
- English only in repository content.
