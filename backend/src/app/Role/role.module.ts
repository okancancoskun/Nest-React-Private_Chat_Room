import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleRepository } from 'src/api/Role/role.repository';
import { RoleService } from 'src/api/Role/role.service';
import { Role, roleSchema } from 'src/models';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Role.name, schema: roleSchema }]),
  ],
  providers: [RoleService, RoleRepository],
  exports: [RoleService, RoleRepository],
})
export class RoleModule {}
