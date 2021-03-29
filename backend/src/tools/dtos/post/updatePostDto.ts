import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class UpdatePostDto {
  @IsString()
  @IsOptional()
  title: string;
  @IsString()
  @IsOptional()
  content: string;
  @IsMongoId()
  @IsOptional()
  categoryId: any;
}
