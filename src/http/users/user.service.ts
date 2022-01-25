import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  show(attributes: any): Promise<UserEntity> {
    return this.userRepository.findOne(attributes);
  }

  create(attributes: object): Promise<UserEntity> {
    return this.userRepository.save(attributes);
  }

  async update(id: number, attributes: object): Promise<UserEntity> {
    await this.userRepository.update(id, attributes);
    return this.show(id);
  }
}
