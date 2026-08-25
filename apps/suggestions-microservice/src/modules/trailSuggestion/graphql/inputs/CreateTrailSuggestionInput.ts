import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTrailSuggestionInput {
  @Field()
  suggestionId: string;

  @Field({nullable: true})
  slug: string;

  @Field()
  title: string;

  @Field({nullable: true})
  description: string;
}