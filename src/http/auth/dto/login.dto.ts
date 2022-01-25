import { IsString, MaxLength, Validate } from 'class-validator';
import { ExistsValidator } from '../../../validators/exists.validator';
import { UserEntity } from '../../users/user.entity';

export class LoginDto {
  @IsString()
  @MaxLength(128)
  @Validate(ExistsValidator, [UserEntity])
  username: string;

  @IsString()
  @MaxLength(128)
  password: string;
}
