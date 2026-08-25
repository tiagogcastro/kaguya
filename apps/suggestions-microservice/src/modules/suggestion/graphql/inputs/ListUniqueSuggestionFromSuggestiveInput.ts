import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ListUniqueSuggestionFromSuggestiveInput {
  @Field()
  suggestiveId: string;

  @Field()
  suggestionSlug: string;
}