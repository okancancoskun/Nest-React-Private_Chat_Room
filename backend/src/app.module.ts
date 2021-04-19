import { ChatModule } from './app/Chat/chat.module';
import { MessageModule } from './app/Message/message.module';
import { RoomModule } from './app/Room/room.module';
import { RoomController } from './app/Room/room.controller';
import { UserModule } from './app/User/user.module';
import { UserController } from './app/User/user.controller';
import { RoleController } from './app/Role/role.controller';
import { RoleModule } from './app/Role/role.module';
import { PostModule } from './app/Post/post.module';
import { PostController } from './app/Post/post.controller';
import { CategoryController } from './app/Category/category.controller';
import { CategoryModule } from './app/Category/category.module';
import { MiddlewareConsumer, Module, Req, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './libs/guards/role.guard';
import { AuthMiddleware } from './libs/middlewares/auth.middleware';

@Module({
  imports: [
    ChatModule,
    MessageModule,
    RoomModule,
    UserModule,
    RoleModule,
    PostModule,
    CategoryModule,
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb://localhost/e-commerce',
        useFindAndModify: false,
      }),
    }),
  ],
  controllers: [
    RoomController,
    UserController,
    RoleController,
    PostController,
    CategoryController,
    AppController,
  ],
  providers: [AppService, { provide: APP_GUARD, useClass: RolesGuard }],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'role/create', method: RequestMethod.POST },
        { path: 'post/create', method: RequestMethod.POST },
        { path: 'post/:id', method: RequestMethod.PUT },
        { path: 'category/create', method: RequestMethod.POST },
        { path: 'category/:id', method: RequestMethod.PUT },
      );
  }
}
