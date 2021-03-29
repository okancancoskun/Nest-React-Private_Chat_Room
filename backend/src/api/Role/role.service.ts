import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from 'src/tools/dtos/role/createRoleDto';
import { UpdateRoleDto } from 'src/tools/dtos/role/updateRoleDto';
import { Role } from 'src/models';
import { GenericService, IGenericService } from '../Generic/generic.service';
import { RoleRepository } from './role.repository';

export interface IRoleService
  extends IGenericService<Role, CreateRoleDto, UpdateRoleDto> {}

@Injectable()
export class RoleService
  extends GenericService<Role, CreateRoleDto, UpdateRoleDto>
  implements IRoleService {
  constructor(protected readonly repository: RoleRepository) {
    super(repository);
  }
}
