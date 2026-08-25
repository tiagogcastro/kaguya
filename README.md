# kaguya

![TypeScript](https://img.shields.io/badge/TypeScript-4.x-3178C6?logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-12-000000?logo=nextdotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-4-2D3748?logo=prisma&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-9-E0234E?logo=nestjs&logoColor=white)
![GraphQL](https://img.shields.io/badge/GraphQL-federation-E10098?logo=graphql&logoColor=white)

Kaguya is a learning platform (2021-2023): organized learning trails with
lessons, content blocks and playlists, user accounts with role-based access,
likes and personalized suggestions. This monorepo unifies the three
applications that formed the product, merged from separate repositories with
full history preservation.

## Apps

| App | Path | Description |
|---|---|---|
| API | `apps/backend` | Express + TypeScript REST API: trails, lessons, blocks, playlists, likes, roles, users (Prisma + PostgreSQL, AWS S3) |
| Web client | `apps/next-app` | Next.js client: dashboard, trail player, playlists, suggestions, Google/GitHub login (Chakra UI + Firebase) |
| Suggestions subgraph | `apps/suggestions-microservice` | NestJS GraphQL federation subgraph prototype for trail suggestions |

## Features

- Learning trails composed of lessons and content blocks
- Playlists and like interactions
- Role-based access control
- Firebase authentication (Google and GitHub providers)
- Avatar and content uploads to AWS S3
- Federation experiment: suggestions served as an Apollo subgraph (Kafka integration planned but not activated)

## Tech stack

| Layer | Tools |
|---|---|
| API | Node.js, Express 4, TypeScript, Prisma + PostgreSQL, AWS S3, JWT |
| Web | Next.js 12, React 18, Chakra UI, Firebase Auth, axios |
| Subgraph | NestJS 9, GraphQL federation, PostgreSQL |

## How to run

### Backend

```bash
cd apps/backend
yarn install
cp .env.example .env
yarn dev:server
```

### Web client

```bash
cd apps/next-app
yarn install
yarn dev
```

### Suggestions subgraph

```bash
cd apps/suggestions-microservice
npm install
npm run start:dev
```

## Legacy note

Product developed by a two-person team between 2021 and 2023. Dependencies
are pinned to that era; expect friction on current Node versions without
upgrades. Estimated modernization effort if picked up later: medium (1-2
days), bumping Prisma/Next.js majors and finishing the federation
integration. No fixes are planned as part of this cleanup phase.

## License

[MIT](LICENSE)

## Team

Built by [Tiago Gonçalves de Castro](https://github.com/tiagogcastro)
(frontends and suggestions subgraph) and Marcos Proença (backend core).
