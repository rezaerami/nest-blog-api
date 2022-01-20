import { Module } from '@nestjs/common';
import { PostModule } from './modules/post.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRoot(),
    PostModule,
  ],
})
export class AppModule {}
