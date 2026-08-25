import { Field, ID, ObjectType } from '@nestjs/graphql';

import { SuggestiveModel } from '@modules/suggestive/infra/graphql/models/suggestive.model';
import { TrailSuggestionModel } from '@modules/trailSuggestion/graphql/models/trail-suggestion.model';

@ObjectType()
export class SuggestionModel {
  @Field(() => ID)
  id: string;

  @Field()
  suggestiveId: string;

  @Field()
  slug: string;

  @Field()
  title: string;

  @Field({nullable: true})
  description: string;

  @Field(() => SuggestiveModel, {nullable: true})
  suggestive?: SuggestiveModel;

  @Field(() => TrailSuggestionModel, {nullable: true})
  trailSuggestion?: TrailSuggestionModel;
}