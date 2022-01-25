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
import { CommentService } from './comment.service';
import { IndexCommentDto } from './dto/index-comment.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentEntity } from './comment.entity';
import { JwtGuard } from '../../guards/jwt/jwt.guard';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  index(@Query() request: IndexCommentDto): Promise<CommentEntity[]> {
    const { offset, limit } = request;
    return this.commentService.all(offset, limit);
  }

  @Get(':id')
  show(@Param('id', ParseIntPipe) id: number): Promise<CommentEntity> {
    return this.commentService.show(id);
  }

  @UseGuards(JwtGuard)
  @Post()
  create(
    @Request() request,
    @Body() data: CreateCommentDto,
  ): Promise<CommentEntity> {
    const { id: userId } = request.user;
    const attributes = {
      ...data,
      userId,
    };
    return this.commentService.create(attributes);
  }

  @UseGuards(JwtGuard)
  @Post(':id')
  async update(
    @Request() request,
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateCommentDto,
  ): Promise<CommentEntity> {
    const comment = await this.commentService.show(id);
    if (!comment) throw new NotFoundException();
    if (comment.userId !== request.user.id) throw new ForbiddenException();

    return this.commentService.update(id, body);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async delete(
    @Request() request,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CommentEntity> {
    const comment = await this.commentService.show(id);
    if (!comment) throw new NotFoundException();
    if (comment.userId !== request.user.id) throw new ForbiddenException();

    return this.commentService.delete(id);
  }
}
