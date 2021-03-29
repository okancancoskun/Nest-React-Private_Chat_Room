import { IsEmail, IsMongoId, IsString, MaxLength } from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  @IsString()
  email: string;
  @IsString()
  @MaxLength(8)
  username: string;
  @IsString()
  password: string;
  @IsMongoId()
  roleId: any;
}
