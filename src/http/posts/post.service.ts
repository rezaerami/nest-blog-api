import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PostEntity } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
  ) {}

  all(offset: number, limit: number): Promise<PostEntity[]> {
    return this.postRepository.find({
      skip: offset,
      take: limit,
    });
  }

  show(id: number): Promise<PostEntity> {
    return this.postRepository.findOne(id);
  }

  create(attributes: object): Promise<PostEntity> {
    return this.postRepository.save(attributes);
  }

  async update(id: number, attributes: object): Promise<PostEntity> {
    await this.postRepository.update(id, attributes);
    return this.show(id);
  }

  async delete(id: number): Promise<PostEntity> {
    const post = this.show(id);
    await this.postRepository.delete(id);
    return post;
  }
}
