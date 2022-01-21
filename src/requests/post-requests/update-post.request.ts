import {IsOptional, IsString, MaxLength} from "class-validator";

export class UpdatePostRequest {
  @IsOptional()
  @IsString()
  @MaxLength(128)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description: string;
}
