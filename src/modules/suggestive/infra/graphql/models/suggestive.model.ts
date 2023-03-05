import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SuggestiveModel {
  @Field(() => ID)
  id?: string;

  @Field()
  authUserId: string;

  @Field()
  email: string;

  @Field()
  username: string;

  @Field({nullable: true})
  name: string;

  @Field({nullable: true})
  avatar: string;

  @Field(() => [SuggestiveModel], {nullable: true})
  suggestives?: SuggestiveModel[];
}