import { IsString, MaxLength } from 'class-validator';

export class CreatePostRequest {
  @IsString()
  @MaxLength(128)
  title: string;

  @IsString()
  @MaxLength(1000)
  description: string;
}
