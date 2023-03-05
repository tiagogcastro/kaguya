import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateSuggestionInput {
  @Field()
  suggestiveId: string;

  @Field({nullable: true})
  slug: string;

  @Field()
  title: string;

  @Field({nullable: true})
  description: string;
}