# AGENTS.md

Guidance for AI coding agents working in this repository.

## Project

Kaguya: learning platform (2021-2023) with learning trails, lessons, content
blocks, playlists, likes and role-based access. Monorepo with three apps
merged from separate repositories (histories preserved).

- `apps/backend`: Express + TypeScript REST API (Prisma + PostgreSQL, AWS S3 uploads)
- `apps/next-app`: Next.js client (Chakra UI, Firebase auth with Google/GitHub, dashboard, trails, playlists, suggestions)
- `apps/suggestions-microservice`: NestJS GraphQL federation subgraph prototype for trail suggestions (Kafka integration planned but not activated)

## Commands

Backend:

```bash
cd apps/backend
yarn install
cp .env.example .env
yarn typeorm migration:run    # or prisma migrate deploy, see package.json
yarn dev:server
```

Next.js client:

```bash
cd apps/next-app
yarn install
yarn dev
```

Microservice:

```bash
cd apps/suggestions-microservice
npm install
npm run start:dev
```

## Rules for agents

- Docs-only maintenance phase: no dependency upgrades or runtime behavior changes
- Never commit `.env`; only `.env.example` templates are tracked
