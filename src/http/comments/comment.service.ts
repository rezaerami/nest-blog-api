import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CommentEntity } from './comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,
  ) {}

  all(offset: number, limit: number): Promise<CommentEntity[]> {
    return this.commentRepository.find({
      skip: offset,
      take: limit,
    });
  }

  show(id: number): Promise<CommentEntity> {
    return this.commentRepository.findOne(id);
  }

  create(attributes: object): Promise<CommentEntity> {
    return this.commentRepository.save(attributes);
  }

  async update(id: number, attributes: object): Promise<CommentEntity> {
    await this.commentRepository.update(id, attributes);
    return this.show(id);
  }

  async delete(id: number): Promise<CommentEntity> {
    const comment = this.show(id);
    await this.commentRepository.delete(id);
    return comment;
  }
}
