import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterUserDto } from 'src/tools/dtos/user/registerUserDto';
import { UpdateUserDto } from 'src/tools/dtos/user/updateUserDto';
import { User } from 'src/models';
import {
  GenericRepository,
  IGenericRepository,
} from '../Generic/generic.repository';

export interface IUserRepository
  extends IGenericRepository<User, RegisterUserDto, UpdateUserDto> {}

@Injectable()
export class UserRepository extends GenericRepository<
  User,
  RegisterUserDto,
  UpdateUserDto
> {
  constructor(@InjectModel(User.name) userModel: Model<User>) {
    super(userModel);
  }
}
