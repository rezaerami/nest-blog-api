import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './http/users/user.module';
import { PostModule } from './http/posts/post.module';
import { AuthModule } from './http/auth/auth.module';
import { CommentModule } from './http/comments/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRoot(),
    PostModule,
    UserModule,
    AuthModule,
    CommentModule,
  ],
})
export class AppModule {}
