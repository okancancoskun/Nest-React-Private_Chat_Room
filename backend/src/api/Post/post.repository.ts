import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostDto } from 'src/tools/dtos/post/createPostDto';
import { UpdatePostDto } from 'src/tools/dtos/post/updatePostDto';
import { Post } from 'src/models';
import {
  GenericRepository,
  IGenericRepository,
} from '../Generic/generic.repository';

export interface IPostRepository
  extends IGenericRepository<Post, CreatePostDto, UpdatePostDto> {}

@Injectable()
export class PostRepository
  extends GenericRepository<Post, CreatePostDto, UpdatePostDto>
  implements IPostRepository {
  constructor(@InjectModel(Post.name) postModel: Model<Post>) {
    super(postModel);
  }
}
