import { CreateSuggestionService } from '@modules/suggestion/services/create-suggestion.service';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateSuggestionInput } from '../inputs/CreateSuggestionInput';

import { SuggestionModel } from '../models/suggestion.model';

import { AuthorizationGuard } from '@shared/http/auth/authorization.guard';
import { ListSuggestionsService } from '@modules/suggestion/services/list-suggestions.service';
import { ListSuggestionsFromSuggestiveService } from '@modules/suggestion/services/list-suggestions-from-suggestive.service';
import { ListUniqueSuggestionService } from '@modules/suggestion/services/list-unique-suggestion.service';
import { ListUniqueSuggestionInput } from '../inputs/ListUniqueSuggestionInput';
import { ListSuggestionsFromSuggestiveInput } from '../inputs/ListSuggestionsFromSuggestiveInput';
import { DeleteSuggestionInput } from '../inputs/DeleteSuggestionInput';
import { DeleteSuggestionService } from '@modules/suggestion/services/delete-suggestion.service';
import { ListUniqueSuggestionFromSuggestiveService } from '@modules/suggestion/services/list-unique-suggestion-from-suggestive.service';
import { ListUniqueSuggestionFromSuggestiveInput } from '../inputs/ListUniqueSuggestionFromSuggestiveInput';

@Resolver(() => SuggestionModel)
export class SuggestionResolver {
  constructor(
    private createSuggestionService: CreateSuggestionService,
    private deleteSuggestionService: DeleteSuggestionService,
    private listSuggestionsService: ListSuggestionsService,
    private listSuggestionsFromSuggestiveService: ListSuggestionsFromSuggestiveService,
    private listUniqueSuggestionService: ListUniqueSuggestionService,
    private listUniqueSuggestionFromSuggestiveService: ListUniqueSuggestionFromSuggestiveService,
  ) {}

  @Mutation(() => SuggestionModel)
  // @UseGuards(AuthorizationGuard)
  createSuggestion(@Args('data') data: CreateSuggestionInput) {
    return this.createSuggestionService.execute(data);
  } 

  @Mutation(() => SuggestionModel || null)
  // @UseGuards(AuthorizationGuard)
  async deleteSuggestion(@Args('data') data: DeleteSuggestionInput) {
    await this.deleteSuggestionService.execute(data);

    return null;
  }

  @Query(() => [SuggestionModel])
  // @UseGuards(AuthorizationGuard)
  listSuggestions() {
    return this.listSuggestionsService.execute();
  }

  @Query(() => SuggestionModel || null)
  // @UseGuards(AuthorizationGuard)
  listUniqueSuggestion(@Args('data') data: ListUniqueSuggestionInput) {
    return this.listUniqueSuggestionService.execute(data);
  }

  @Query(() => [SuggestionModel])
  // @UseGuards(AuthorizationGuard)
  listSuggestionsFromSuggestive(@Args('data') data: ListSuggestionsFromSuggestiveInput) {
    return this.listSuggestionsFromSuggestiveService.execute(data);
  }

  @Query(() => SuggestionModel || null)
  // @UseGuards(AuthorizationGuard)
  listUniqueSuggestionFromSuggestive(@Args('data') data: ListUniqueSuggestionFromSuggestiveInput) {
    return this.listUniqueSuggestionFromSuggestiveService.execute(data);
  }
}
