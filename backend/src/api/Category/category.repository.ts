import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from 'src/tools/dtos/category/createCategoryDto';
import { UpdateCategoryDto } from 'src/tools/dtos/category/updateCategoryDto';
import { Category } from 'src/models';
import {
  GenericRepository,
  IGenericRepository,
} from '../Generic/generic.repository';

export interface ICategoryRepository
  extends IGenericRepository<Category, CreateCategoryDto, UpdateCategoryDto> {}

@Injectable()
export class CategoryRepository
  extends GenericRepository<Category, CreateCategoryDto, UpdateCategoryDto>
  implements ICategoryRepository {
  constructor(@InjectModel(Category.name) categoryModel: Model<Category>) {
    super(categoryModel);
  }
}
