import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ListSuggestionsFromSuggestiveInput {
  @Field()
  suggestiveId: string;
}