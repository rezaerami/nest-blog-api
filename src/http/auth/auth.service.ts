import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '../users/user.entity';
import { CredentialsInterface } from '../../contracts/interfaces/credentials.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  /**
   * attempt for login
   * gets attributes to find user, then uses password to authorize user
   * @param credentials
   * @return UserEntity
   */
  async attempt(credentials: CredentialsInterface): Promise<UserEntity> {
    const { password, ...attributes } = credentials;
    const user = await this.userRepository.findOne(attributes);
    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        return user;
      }
    }
    return null;
  }
}
