import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateAuthorInput {
  @IsNotEmpty()
  @IsEmail()
  @Field()
  email: string;

  @IsString()
  @Field({ nullable: true })
  firstName?: string;

  @IsString()
  @Field({ nullable: true })
  lastName?: string;
}
