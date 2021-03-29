import { IsString } from 'class-validator';

export class loginUserDto {
  @IsString()
  username: string;
  @IsString()
  password: string;
}
