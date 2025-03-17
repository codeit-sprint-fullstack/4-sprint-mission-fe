import { UserEntity } from '../entities/user.entity';

export interface UserLoginDto {
  email: string;
  password: string;
}

export interface UserSignUpDto extends UserLoginDto {
  nickname: string;
  passwordConfirmation: string;
}

export type UserInfoDto = Pick<UserEntity, 'nickname'>;
