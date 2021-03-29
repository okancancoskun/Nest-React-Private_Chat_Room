import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from 'src/tools/dtos/category/createCategoryDto';
import { UpdateCategoryDto } from 'src/tools/dtos/category/updateCategoryDto';
import { Category } from 'src/models';
import { GenericService, IGenericService } from '../Generic/generic.service';
import { CategoryRepository } from './category.repository';

export interface ICategoryService
  extends IGenericService<Category, CreateCategoryDto, UpdateCategoryDto> {}

  
@Injectable()
export class CategoryService
  extends GenericService<Category, CreateCategoryDto, UpdateCategoryDto>
  implements ICategoryService {
  constructor(protected readonly repository: CategoryRepository) {
    super(repository);
  }
}
