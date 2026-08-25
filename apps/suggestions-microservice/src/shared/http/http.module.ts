import * as path from 'path';

import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig
} from '@nestjs/apollo';

import { ConfigModule } from '@nestjs/config';
import { CreateSuggestionService } from '@modules/suggestion/services/create-suggestion.service';
import { CreateSuggestiveService } from '@modules/suggestive/services/create-suggestive.service';
import { CreateTrailSuggestionService } from '@modules/trailSuggestion/services/create-trail-suggestion.service';
import { DatabaseModule } from '@shared/database/database.module';
import { DeleteSuggestionService } from '@modules/suggestion/services/delete-suggestion.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ListSuggestionsFromSuggestiveService } from '@modules/suggestion/services/list-suggestions-from-suggestive.service';
import { ListSuggestionsService } from '@modules/suggestion/services/list-suggestions.service';
import { ListUniqueSuggestionFromSuggestiveService } from '@modules/suggestion/services/list-unique-suggestion-from-suggestive.service';
import { ListUniqueSuggestionService } from '@modules/suggestion/services/list-unique-suggestion.service';
import { Module } from '@nestjs/common';
import { SuggestionRepository } from '@modules/suggestion/infra/prisma/repositories/suggestion-repository';
import { SuggestionResolver } from '@modules/suggestion/graphql/resolvers/suggestion.resolver';
import { SuggestiveRepository } from '@modules/suggestive/infra/prisma/repositories/suggestive-repository';
import { TrailSuggestionRepository } from '@modules/trailSuggestion/infra/prisma/repositories/trail-suggestion-repository';
import { TrailSuggestionResolver } from '@modules/trailSuggestion/graphql/resolvers/trail-suggestion.resolver';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      autoSchemaFile: {
        path: path.resolve(process.cwd(), 'src/schema.gql'),
        federation: { version: 2 },
      },
      driver: ApolloFederationDriver,
      context: ({ req, res }) => ({ req, res }),
    }),
  ],
  controllers: [],
  providers: [
    CreateSuggestiveService,

    CreateSuggestionService,
    DeleteSuggestionService,
    ListSuggestionsService,
    ListSuggestionsFromSuggestiveService,
    ListUniqueSuggestionService,
    ListUniqueSuggestionFromSuggestiveService,

    CreateTrailSuggestionService,

    SuggestionResolver,
    TrailSuggestionResolver,

    SuggestiveRepository,
    SuggestionRepository,
    TrailSuggestionRepository,
  ],
})
export class HttpModule {}
