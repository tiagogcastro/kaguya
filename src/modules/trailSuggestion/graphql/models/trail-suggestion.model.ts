import { Field, ID, ObjectType } from '@nestjs/graphql';

import { SuggestionModel } from '@modules/suggestion/graphql/models/suggestion.model';

@ObjectType()
export class TrailSuggestionModel {
  @Field(() => ID)
  id: string;

  @Field()
  suggestionId: string;

  @Field()
  slug: string;

  @Field()
  title: string;

  @Field({nullable: true})
  description?: string;
  
  @Field({nullable: true})
  avatar?: string;

  @Field(() => SuggestionModel, {nullable: true})
  suggestion?: SuggestionModel;

  // @Field(() => [PlaylistSuggestionModel], {nullable: true})
  // playlists?: PlaylistSuggestionModel[];
}