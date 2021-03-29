import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from 'src/api/User/user.service';
import { loginUserDto } from 'src/tools/dtos/user/loginUserDto';
import { RegisterUserDto } from 'src/tools/dtos/user/registerUserDto';
import { UpdateUserDto } from 'src/tools/dtos/user/updateUserDto';
import { User } from 'src/models';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  async findAll(): Promise<User[]> {
    return await this.userService.findAll({}, { populate: 'roleId' });
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return await this.userService.findOne({ _id: id }, { populate: 'roleId' });
  }

  @Post('register')
  async register(@Body() body: RegisterUserDto): Promise<User | any> {
    return await this.userService.register(body);
  }

  @Post('login')
  async login(@Body() body: loginUserDto): Promise<any> {
    return await this.userService.login(body);
  }

  @Put(':id')
  async updateById(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
  ): Promise<User> {
    return await this.userService.findByIdAndUpdate(id, body);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<User> {
    return await this.userService.deleteOne(id);
  }
}
