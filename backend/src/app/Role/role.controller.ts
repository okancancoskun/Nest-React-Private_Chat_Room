import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RoleService } from 'src/api/Role/role.service';
import { CreateRoleDto } from 'src/tools/dtos/role/createRoleDto';
import { UpdateRoleDto } from 'src/tools/dtos/role/updateRoleDto';
import { Role } from 'src/models';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get('')
  async findAll(): Promise<Role[]> {
    return await this.roleService.findAll({}, {});
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Role> {
    return await this.roleService.findOne({ _id: id }, {});
  }

  @Post('create')
  async create(@Body() body: CreateRoleDto): Promise<Role> {
    return await this.roleService.create(body);
  }

  @Put(':id')
  async updateById(
    @Param('id') id: string,
    @Body() body: UpdateRoleDto,
  ): Promise<Role> {
    return await this.roleService.findByIdAndUpdate(id, body);
  }

  @Delete(':id')
  async deleteOne(id: string): Promise<Role> {
    return await this.roleService.deleteOne(id);
  }
}
