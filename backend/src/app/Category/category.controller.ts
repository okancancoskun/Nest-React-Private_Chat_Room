import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryService } from 'src/api/Category/category.service';
import { CreateCategoryDto } from 'src/tools/dtos/category/createCategoryDto';
import { UpdateCategoryDto } from 'src/tools/dtos/category/updateCategoryDto';
import { Category } from 'src/models';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAll(): Promise<Category[]> {
    return await this.categoryService.findAll({}, {});
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Category> {
    return await this.categoryService.findOne({ _id: id }, {});
  }

  @Post('create')
  async create(@Body() body: CreateCategoryDto): Promise<Category> {
    return await this.categoryService.create(body);
  }

  @Put(':id')
  async updateById(
    @Param('id') id: string,
    @Body() body: UpdateCategoryDto,
  ): Promise<any> {
    return await this.categoryService.findByIdAndUpdate(id, body);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<Category> {
    return await this.categoryService.deleteOne(id);
  }
}
