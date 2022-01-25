import { IsNumber, IsString, MaxLength, Validate } from 'class-validator';
import { ExistsValidator } from '../../../validators/exists.validator';
import { PostEntity } from '../../posts/post.entity';

export class CreateCommentDto {
  @IsNumber()
  @Validate(ExistsValidator, [PostEntity, 'id'])
  postId: number;

  @IsString()
  @MaxLength(1000)
  content: string;
}
