import { IsNotEmpty, IsString, MaxLength, Validate } from 'class-validator';
import { UserEntity } from '../../users/user.entity';
import { UniqueValidator } from '../../../validators/unique.validator';

export class RegisterDto {
  @IsString()
  @MaxLength(128)
  @IsNotEmpty()
  name: string;

  @IsString()
  @MaxLength(128)
  @IsNotEmpty()
  @Validate(UniqueValidator, [UserEntity])
  username: string;

  @IsString()
  @MaxLength(128)
  @IsNotEmpty()
  password: string;
}
