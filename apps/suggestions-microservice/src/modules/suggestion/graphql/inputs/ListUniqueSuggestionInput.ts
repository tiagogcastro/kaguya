import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ListUniqueSuggestionInput {
  @Field({nullable: true})
  suggestionId: string;

  @Field({nullable: true})
  suggestionSlug: string;
}