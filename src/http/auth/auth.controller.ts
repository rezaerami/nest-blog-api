import * as bcrypt from 'bcrypt';
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../users/user.service';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '../../guards/auth/auth.guard';
import { TokenPayloadInterface } from '../../contracts/interfaces/token-payload.interface';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Body() request: RegisterDto): Promise<object> {
    const attributes = {
      ...request,
      password: await bcrypt.hash(request.password, process.env.BCRYPT_SALT),
    };
    const user = await this.userService.create(attributes);
    const token = this.jwtService.sign({ id: user.id });

    return {
      ...user,
      token,
    };
  }

  @UseGuards(AuthGuard)
  @Post('login')
  async login(@Request() request): Promise<object> {
    const { id } = request.user;
    const token = this.jwtService.sign({ id });

    return {
      ...request.user,
      token,
    };
  }

  @Post('refresh-token')
  async refreshToken(@Body() request): Promise<object> {
    const { id } = (await this.jwtService.decode(
      request.token,
    )) as TokenPayloadInterface;
    const token = this.jwtService.sign({ id });

    return {
      token,
    };
  }
}
