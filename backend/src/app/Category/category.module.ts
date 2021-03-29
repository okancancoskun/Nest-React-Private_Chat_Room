import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryRepository } from 'src/api/Category/category.repository';
import { CategoryService } from 'src/api/Category/category.service';
import { Category, categorySchema } from 'src/models';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: categorySchema },
    ]),
  ],
  providers: [CategoryService, CategoryRepository],
})
export class CategoryModule {}
