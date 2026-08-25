import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DeleteSuggestionInput {
  @Field()
  suggestiveId: string;

  @Field({ nullable: true})
  suggestionSlug: string;
}