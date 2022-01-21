import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UserEntity } from '../users/user.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../users/user.service';
import { AuthStrategy } from '../../guards/auth/auth.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRE },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthStrategy, UserService, AuthService],
})
export class AuthModule {}
