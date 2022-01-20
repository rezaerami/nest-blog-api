import { IsNumber, Max } from 'class-validator';

export class IndexPostRequest {
  @IsNumber()
  @Max(1000)
  offset: number;

  @IsNumber()
  @Max(50)
  limit: number;
}
