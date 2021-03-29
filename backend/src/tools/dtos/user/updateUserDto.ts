import {
  IsEmail,
  IsMongoId,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsEmail()
  @IsOptional()
  email: string;
  @IsString()
  @IsOptional()
  @MaxLength(8)
  username: string;
  @IsString()
  @IsOptional()
  password: string;
  @IsMongoId()
  @IsOptional()
  roleId: any;
}
