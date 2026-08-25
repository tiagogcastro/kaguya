import 'reflect-metadata';
import '@/shared/container';
import { container } from 'tsyringe';
import { prisma } from '../connection';
import { CreateBlockService } from '@/modules/blocks/services/create-block-service';
import { CreateLessonService } from '@/modules/lessons/services/create-lesson-service';
import { CreatePlaylistFromTrailService } from '@/modules/playlists/services/create-playlist-from-trail-service';
import { CreateTrailService } from '@/modules/trails/services/create-trail-service';
import { BCryptHashProvider } from '@/modules/users/providers/hash-provider/implementations/bcrypt-hash-provider';

type SeedUser = {
  name: string;
  email: string;
  username: string;
  password: string;
};

const users: Array<SeedUser & { role: string }> = [
  {
    name: process.env.ADMIN_NAME || 'App Admin',
    email: process.env.ADMIN_ACCESS || 'app@kaguya.com.br',
    username: process.env.ADMIN_USERNAME || 'app',
    password: process.env.ADMIN_PASS || 'app12345',
    role: 'admin',
  },
  {
    name: 'Sub Admin',
    email: 'sub@kaguya.com.br',
    username: 'subadmin',
    password: 'sub12345',
    role: 'sub-admin',
  },
  {
    name: 'Joana Souza',
    email: 'joana@kaguya.com.br',
    username: 'joana',
    password: 'joana12345',
    role: 'default',
  },
  {
    name: 'Carlos Lima',
    email: 'carlos@kaguya.com.br',
    username: 'carlos',
    password: 'carlos12345',
    role: 'default',
  },
];

const roles = [
  { name: 'admin', permission: 0 },
  { name: 'sub-admin', permission: 1 },
  { name: 'default', permission: 2 },
];

type LessonSeed = {
  name: string;
  slug: string;
  description: string;
  link: string;
};

type BlockSeed = {
  name: string;
  slug: string;
  lessons: LessonSeed[];
};

type PlaylistSeed = {
  name: string;
  slug: string;
  description: string;
  blocks: BlockSeed[];
};

type TrailSeed = {
  name: string;
  slug: string;
  description: string;
  playlists: PlaylistSeed[];
};

const video = (id: string) => `https://www.youtube.com/watch?v=${id}`;

const trails: TrailSeed[] = [
  {
    name: 'JavaScript do Zero',
    slug: 'javascript-do-zero',
    description:
      'Aprenda a linguagem que roda na web partindo do absoluto zero: sintaxe, funções, DOM e eventos.',
    playlists: [
      {
        name: 'Fundamentos da Linguagem',
        slug: 'fundamentos-da-linguagem',
        description:
          'Variáveis, tipos, operadores e funções: a base de qualquer código JavaScript.',
        blocks: [
          {
            name: 'Sintaxe Básica',
            slug: 'sintaxe-basica',
            lessons: [
              {
                name: 'Variáveis e Tipos',
                slug: 'variaveis-e-tipos',
                description: 'let, const e os tipos primitivos da linguagem.',
                link: video('PkZNo7MFNFg'),
              },
              {
                name: 'Operadores',
                slug: 'operadores',
                description:
                  'Aritméticos, comparação e lógicos na prática.',
                link: video('W6NZfCO5SIk'),
              },
            ],
          },
          {
            name: 'Funções',
            slug: 'funcoes',
            lessons: [
              {
                name: 'Parâmetros e Retorno',
                slug: 'parametros-e-retorno',
                description: 'Como declarar funções e reutilizar lógica.',
                link: video('W6NZfCO5SIk'),
              },
              {
                name: 'Arrow Functions',
                slug: 'arrow-functions',
                description: 'Sintaxe curta e o comportamento do this.',
                link: video('PkZNo7MFNFg'),
              },
            ],
          },
        ],
      },
      {
        name: 'DOM e Eventos',
        slug: 'dom-e-eventos',
        description:
          'Interaja com a página: selecione elementos, altere conteúdo e escute eventos.',
        blocks: [
          {
            name: 'Seleção de Elementos',
            slug: 'selecao-de-elementos',
            lessons: [
              {
                name: 'querySelector na prática',
                slug: 'queryselector-na-pratica',
                description: 'Encontre qualquer elemento da página.',
                link: video('W6NZfCO5SIk'),
              },
              {
                name: 'Manipulação do DOM',
                slug: 'manipulacao-do-dom',
                description: 'Crie, altere e remova nós da árvore.',
                link: video('PkZNo7MFNFg'),
              },
            ],
          },
          {
            name: 'Eventos',
            slug: 'eventos',
            lessons: [
              {
                name: 'addEventListener',
                slug: 'addeventlistener',
                description: 'Reaja a cliques, teclas e scroll.',
                link: video('W6NZfCO5SIk'),
              },
              {
                name: 'Formulários',
                slug: 'formularios',
                description: 'Validação e captura de dados do usuário.',
                link: video('PkZNo7MFNFg'),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Node.js e APIs',
    slug: 'nodejs-e-apis',
    description:
      'Construa APIs REST com Express e PostgreSQL, do primeiro servidor à persistência com Prisma.',
    playlists: [
      {
        name: 'Express na Prática',
        slug: 'express-na-pratica',
        description: 'Rotas, middlewares e a estrutura de uma API profissional.',
        blocks: [
          {
            name: 'Rotas',
            slug: 'rotas',
            lessons: [
              {
                name: 'CRUD com Express',
                slug: 'crud-com-express',
                description: 'Os cinco verbos HTTP que você vai mais usar.',
                link: video('FqqMie5iZTU'),
              },
              {
                name: 'Rotas Dinâmicas',
                slug: 'rotas-dinamicas',
                description: 'Parâmetros de rota e query params.',
                link: video('FqqMie5iZTU'),
              },
            ],
          },
          {
            name: 'Middlewares',
            slug: 'middlewares',
            lessons: [
              {
                name: 'O que são Middlewares',
                slug: 'o-que-sao-middlewares',
                description: 'O pipeline de requisições do Express.',
                link: video('FqqMie5iZTU'),
              },
              {
                name: 'Autenticação JWT',
                slug: 'autenticacao-jwt',
                description: 'Proteja rotas com tokens assinados.',
                link: video('FqqMie5iZTU'),
              },
            ],
          },
        ],
      },
      {
        name: 'APIs com PostgreSQL',
        slug: 'apis-com-postgresql',
        description: 'Modele seu banco e persista dados com o Prisma ORM.',
        blocks: [
          {
            name: 'Modelagem',
            slug: 'modelagem',
            lessons: [
              {
                name: 'Relacionamentos',
                slug: 'relacionamentos',
                description: 'Um-para-muitos e muitos-para-muitos.',
                link: video('Hu5CBm4K8us'),
              },
              {
                name: 'Migrações',
                slug: 'migracoes',
                description: 'Versionamento do schema do banco.',
                link: video('Hu5CBm4K8us'),
              },
            ],
          },
          {
            name: 'Persistência',
            slug: 'persistencia',
            lessons: [
              {
                name: 'Prisma ORM',
                slug: 'prisma-orm',
                description: 'Client tipado gerado a partir do schema.',
                link: video('Hu5CBm4K8us'),
              },
              {
                name: 'Queries Avançadas',
                slug: 'queries-avancadas',
                description: 'Includes, filtros e paginação.',
                link: video('Hu5CBm4K8us'),
              },
            ],
          },
        ],
      },
    ],
  },
];

async function seedRoles() {
  for (const role of roles) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: {},
      create: { id: crypto.randomUUID(), ...role },
    });
  }
}

async function seedUsers() {
  const hashProvider = new BCryptHashProvider();

  for (const seedUser of users) {
    const role = await prisma.role.findUnique({
      where: { name: seedUser.role },
    });

    if (!role) throw new Error(`Role ${seedUser.role} not found`);

    const existing = await prisma.user.findUnique({
      where: { email: seedUser.email },
    });

    if (existing) continue;

    const user = await prisma.user.create({
      data: {
        id: crypto.randomUUID(),
        name: seedUser.name,
        email: seedUser.email,
        username: seedUser.username,
        password: await hashProvider.generateHash(seedUser.password),
      },
    });

    await prisma.userRole.create({
      data: {
        id: crypto.randomUUID(),
        user_id: user.id,
        role_id: role.id,
      },
    });
  }
}

async function seedContent() {
  const creator = await prisma.user.findUniqueOrThrow({
    where: { email: users[0].email },
  });

  const createTrail = container.resolve(CreateTrailService);
  const createPlaylist = container.resolve(CreatePlaylistFromTrailService);
  const createBlock = container.resolve(CreateBlockService);
  const createLesson = container.resolve(CreateLessonService);

  for (const trailSeed of trails) {
    const exists = await prisma.trail.findUnique({
      where: { slug: trailSeed.slug },
    });

    if (exists) continue;

    const trail = await createTrail.execute({
      name: trailSeed.name,
      slug: trailSeed.slug,
      description: trailSeed.description,
    });

    for (const playlistSeed of trailSeed.playlists) {
      const playlist = await createPlaylist.execute({
        trail_id: trail.id,
        name: playlistSeed.name,
        slug: playlistSeed.slug,
        description: playlistSeed.description,
      });

      for (const blockSeed of playlistSeed.blocks) {
        const block = await createBlock.execute({
          playlist_id: playlist.id,
          name: blockSeed.name,
          slug: blockSeed.slug,
        });

        for (const lessonSeed of blockSeed.lessons) {
          await createLesson.execute({ ...lessonSeed, block_id: block.id });
        }
      }
    }

    console.log(`trail seeded: ${trail.name}`);
  }
}

const main = async () => {
  await seedRoles();
  await seedUsers();
  await seedContent();

  console.log('Seed completed!');
};

main()
  .catch(error => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
