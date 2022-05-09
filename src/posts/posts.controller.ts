import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseFilters, UseGuards } from '@nestjs/common';

import { PostsService } from './posts.service';
import CreatePostDto from './dto/createPost.dto';
import UpdatePostDto from './dto/updatePost.dto';
import JwtAuthGuard from '../auth/jwtAuth.guard';
import { ExceptionLoggerFilter } from '../utils/exceptionsLogger.filter';
import { FindOneParams } from '../utils/findOneParams';
import { RequestWithUser } from '../auth/requestWithUser.interface';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @Get(':id')
  @UseFilters(ExceptionLoggerFilter)
  getPostById(@Param() { id }: FindOneParams) {
    return this.postsService.getPostById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createPost(@Body() post: CreatePostDto, @Req() req: RequestWithUser) {
    return this.postsService.createPost(post, req.user);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async replacePost(@Param('id') id: string, @Body() post: UpdatePostDto) {
    return this.postsService.updatePost(id, post);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    this.postsService.deletePost(id);
  }
}
