import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { Request } from 'express';
import { PostService } from 'src/api/Post/post.service';
import { CreatePostDto } from 'src/tools/dtos/post/createPostDto';
import { UpdatePostDto } from 'src/tools/dtos/post/updatePostDto';
import { Post as PostModel } from 'src/models';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('')
  async findAll(): Promise<PostModel[]> {
    return await this.postService.findAll(
      {},
      { populate: { path: 'authorId categoryId' } },
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PostModel> {
    return await this.postService.findOne(
      { _id: id },
      { populate: 'authorId categoryId' },
    );
  }

  @Post('create')
  async create(
    @Body() body: CreatePostDto,
    @Req() req: Request,
  ): Promise<PostModel> {
    return await this.postService.create({ ...body, authorId: req.user._id });
  }

  @Put(':id')
  async updateById(
    @Param('id') id: string,
    @Body() body: UpdatePostDto,
  ): Promise<PostModel> {
    return await this.postService.findByIdAndUpdate(id, body);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id:string):Promise<PostModel>{
      return await this.postService.deleteOne(id);
  }
}
