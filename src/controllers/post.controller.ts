import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { PostService } from '../services/post.service';
import { IndexPostRequest } from '../requests/post-requests/index-post.request';
import { CreatePostRequest } from '../requests/post-requests/create-post.request';
import { UpdatePostRequest } from '../requests/post-requests/update-post.request';
import { PostEntity } from '../entities/post.entity';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  index(@Query() request: IndexPostRequest): Promise<PostEntity[]> {
    const { offset, limit } = request;
    console.log(typeof offset)
    return this.postService.all(offset, limit);
  }

  @Get(':id')
  show(@Param('id', ParseIntPipe) id: number): Promise<PostEntity> {
    return this.postService.show(id);
  }

  @Post()
  create(@Body() request: CreatePostRequest): Promise<PostEntity> {
    return this.postService.create(request);
  }

  @Post(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() request: UpdatePostRequest,
  ): Promise<PostEntity> {
    return this.postService.update(id, request);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<PostEntity> {
    return this.postService.delete(id);
  }
}
