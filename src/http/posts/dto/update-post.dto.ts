import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  @MaxLength(128)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description: string;
}
