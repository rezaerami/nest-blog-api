import { IsNumber, Max, Validate } from 'class-validator';
import { ExistsValidator } from '../../../validators/exists.validator';
import { PostEntity } from '../../posts/post.entity';

export class IndexCommentDto {
  @IsNumber()
  @Validate(ExistsValidator, [PostEntity, 'id'])
  postId: number;

  @IsNumber()
  @Max(1000)
  offset: number;

  @IsNumber()
  @Max(50)
  limit: number;
}
