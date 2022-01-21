import { Controller, Get, Request, UseGuards } from '@nestjs/common';

import { UserService } from './user.service';
import { JwtGuard } from '../../guards/jwt/jwt.guard';
import { UserEntity } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get('profile')
  profile(@Request() request): Promise<UserEntity> {
    return request.user;
  }
}
