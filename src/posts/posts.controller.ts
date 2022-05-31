import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, Req, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';

import { PostsService } from './posts.service';
import CreatePostDto from './dto/createPost.dto';
import UpdatePostDto from './dto/updatePost.dto';
import JwtAuthGuard from '../auth/jwtAuth.guard';
import { ExceptionLoggerFilter } from '../utils/exceptionsLogger.filter';
import { FindOneParams } from '../utils/findOneParams';
import { RequestWithUser } from '../auth/requestWithUser.interface';
import { PaginationParams } from '../utils/types/paginationParams'

@Controller('posts')
@UseInterceptors(ClassSerializerInterceptor)
export class PostsController {
  constructor(
    private readonly postsService: PostsService
  ) {}

  @Get()
  getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @Get()
  async getPosts(
    @Query('search') search: string,
    @Query() { offset, limit }: PaginationParams
  ) {
    if (search) {
      //TODO: Create search if needed
      // return this.postsService.searchForPosts(search, offset, limit);
    }

    return this.postsService.getAllPosts(offset, limit);
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
