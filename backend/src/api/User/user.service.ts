import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterUserDto } from 'src/tools/dtos/user/registerUserDto';
import { UpdateUserDto } from 'src/tools/dtos/user/updateUserDto';
import { User } from 'src/models';
import { GenericService, IGenericService } from '../Generic/generic.service';
import { UserRepository } from './user.repository';
import * as jwt from 'jsonwebtoken';
import { RoleService } from '../Role/role.service';
import { loginUserDto } from 'src/tools/dtos/user/loginUserDto';
import { compare } from 'bcrypt';
import environment from 'src/tools/environment';

export interface IUserService
  extends IGenericService<User, RegisterUserDto, UpdateUserDto> {}

@Injectable()
export class UserService
  extends GenericService<User, RegisterUserDto, UpdateUserDto>
  implements IUserService {
  constructor(
    protected readonly repository: UserRepository,
    private readonly roleService: RoleService,
  ) {
    super(repository);
  }

  async register(dto: RegisterUserDto): Promise<User | any> {
    const isUserExist = await this.repository.findOne({ email: dto.email }, {});
    const role = await this.roleService.findOne({ name: 'user' }, {});

    if (!isUserExist) {
      return await this.repository.create({ ...dto, roleId: role._id });
    } else {
      throw new HttpException('User Already Exist', HttpStatus.FORBIDDEN);
    }
  }

  async login(dto: loginUserDto): Promise<any> {
    const isUserExist = await this.repository.findOne(
      { username: dto.username },
      {},
    );

    if (isUserExist) {
      const isSuccess = await compare(dto.password, isUserExist.password);
      if (isSuccess) {
        const { _id, username, roleId } = isUserExist;
        const token = jwt.sign(
          { _id: _id, username: username, role: roleId.name },
          environment.token,
          { expiresIn: '24h' },
        );
        return {
          token,
          user: { _id, username, role: roleId.name },
        };
      } else {
        throw new HttpException(
          'Password is not correct',
          HttpStatus.BAD_REQUEST,
        );
      }
    } else {
      throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);
    }
  }
}
