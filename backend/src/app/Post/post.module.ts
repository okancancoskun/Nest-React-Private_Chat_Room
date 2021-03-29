import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostRepository } from 'src/api/Post/post.repository';
import { PostService } from 'src/api/Post/post.service';
import { Post, postSchema } from 'src/models';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: postSchema }]),
    
  ],
  providers: [PostService, PostRepository],
  exports: [PostService, PostRepository],
})
export class PostModule {}
