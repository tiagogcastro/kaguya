import { CreateTrailSuggestionService } from '@modules/trailSuggestion/services/create-trail-suggestion.service';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateTrailSuggestionInput } from '../inputs/CreateTrailSuggestionInput';
import { TrailSuggestionModel } from '../models/trail-suggestion.model';

@Resolver(() => TrailSuggestionModel)
export class TrailSuggestionResolver {
  constructor(
    private createTrailSuggestionService: CreateTrailSuggestionService,
  ) {}

  @Mutation(() => TrailSuggestionModel)
  // @UseGuards(AuthorizationGuard)
  createTrailSuggestion(@Args('data') data: CreateTrailSuggestionInput) {
    return this.createTrailSuggestionService.execute(data);
  } 
}
