import { Injectable } from '@nestjs/common';
import { CreatePostDto } from 'src/tools/dtos/post/createPostDto';
import { UpdatePostDto } from 'src/tools/dtos/post/updatePostDto';
import { Post } from 'src/models';
import { GenericService, IGenericService } from '../Generic/generic.service';
import { PostRepository } from './post.repository';

export interface IPostService
  extends IGenericService<Post, CreatePostDto, UpdatePostDto> {}

@Injectable()
export class PostService
  extends GenericService<Post, CreatePostDto, UpdatePostDto>
  implements IPostService {
  constructor(protected readonly repository: PostRepository) {
    super(repository);
  }
}
