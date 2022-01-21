import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../../http/auth/auth.service';
import { UserEntity } from '../../http/users/user.entity';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy, 'auth') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<UserEntity> {
    const user = await this.authService.attempt({ username, password });
    if (user) {
      return user;
    }

    throw new ForbiddenException();
  }
}
