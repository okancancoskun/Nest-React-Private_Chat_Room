import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from 'src/api/User/user.repository';
import { UserService } from 'src/api/User/user.service';
import { User, userSchema } from 'src/models';
import { RoleModule } from '../Role/role.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
    RoleModule,
  ],
  providers: [UserRepository, UserService],
  exports: [UserRepository, UserService],
})
export class UserModule {}
