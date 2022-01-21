import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { IndexPostDto } from './dto/index-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './post.entity';
import { JwtGuard } from '../../guards/jwt/jwt.guard';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  index(@Query() request: IndexPostDto): Promise<PostEntity[]> {
    const { offset, limit } = request;
    return this.postService.all(offset, limit);
  }

  @Get(':id')
  show(@Param('id', ParseIntPipe) id: number): Promise<PostEntity> {
    return this.postService.show(id);
  }

  @UseGuards(JwtGuard)
  @Post()
  create(@Request() request, @Body() data: CreatePostDto): Promise<PostEntity> {
    const { id: userId } = request.user;
    const attributes = {
      ...data,
      userId,
    };
    return this.postService.create(attributes);
  }

  @UseGuards(JwtGuard)
  @Post(':id')
  async update(
    @Request() request,
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdatePostDto,
  ): Promise<PostEntity> {
    const post = await this.postService.show(id);
    if (!post) throw new NotFoundException();
    if (post.userId !== request.user.id) throw new ForbiddenException();

    return this.postService.update(id, body);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async delete(
    @Request() request,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PostEntity> {
    const post = await this.postService.show(id);
    if (!post) throw new NotFoundException();
    if (post.userId !== request.user.id) throw new ForbiddenException();

    return this.postService.delete(id);
  }
}
