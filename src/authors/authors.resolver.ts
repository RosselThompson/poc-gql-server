import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthorsService } from './authors.service';
import { Author } from './entities/author.entity';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';

@Resolver(() => Author)
export class AuthorsResolver {
  constructor(private readonly authorService: AuthorsService) {}

  @Query(() => [Author])
  async getAuthors(): Promise<Author[]> {
    return await this.authorService.findAll();
  }

  @Query(() => Author)
  async getAuthorById(
    @Args('authorId', { type: () => Int }) id: number,
  ): Promise<Author> {
    return await this.authorService.findOne(id);
  }

  @Mutation(() => Author)
  async createAuthor(
    @Args('createAuthorInput') authorInput: CreateAuthorInput,
  ): Promise<Author> {
    return await this.authorService.create(authorInput);
  }

  @Mutation(() => Author)
  async updateAuthor(
    @Args('authorId', { type: () => Int }) id: number,
    @Args('updateAuthorInput') authorInput: UpdateAuthorInput,
  ): Promise<Author> {
    return await this.authorService.update(id, authorInput);
  }

  @Mutation(() => String)
  async removeAuthor(
    @Args('authorId', { type: () => Int }) id: number,
  ): Promise<string> {
    return await this.authorService.remove(id);
  }
}
