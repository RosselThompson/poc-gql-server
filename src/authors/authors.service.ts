import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './entities/author.entity';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async findAll(): Promise<Author[]> {
    return await this.authorRepository.find();
  }

  async findOne(id: number): Promise<Author> {
    return await this.authorRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  async create(createAuthorInput: CreateAuthorInput): Promise<Author> {
    const newAuthor: Author = await this.authorRepository.create({
      firstName: createAuthorInput.firstName,
      lastName: createAuthorInput.lastName,
      email: createAuthorInput.email,
      isActive: true,
    });
    return await this.authorRepository.save(newAuthor);
  }

  async update(
    id: number,
    updateAuthorInput: UpdateAuthorInput,
  ): Promise<Author> {
    const { affected } = await this.authorRepository.update(
      id,
      updateAuthorInput,
    );
    if (affected > 0) return await this.findOne(id);
    return;
  }

  async remove(id: number): Promise<string> {
    const removedAuthor = await this.findOne(id);
    const { affected } = await this.authorRepository.update(id, {
      ...removedAuthor,
      isActive: false,
    });
    if (affected > 0) return `Author with id ${id} was deleted`;
    return;
  }
}
