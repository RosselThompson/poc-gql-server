import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreatePostInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  title: string;

  @IsString()
  @Field({ nullable: true })
  content?: string;
}
