import { randomUUID } from 'crypto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import UpdatePostDto from './dto/updatePost.dto';
import CreatePostDto from './dto/createPost.dto';
import { Post } from './post.interface';
import PostEntity from './post.entity';
import { PostNotFoundException } from './exception/postNotFound.exception';


const NOT_FOUND_MSG = 'Post not found';

@Injectable()
export class PostsService {
  private posts: Post[] = [];

  constructor(@InjectRepository(PostEntity) private postsRepository: Repository<PostEntity>) {}

  async getAllPosts() {
    return await this.postsRepository.find();
  }

  async getPostById(id: string) {
    const post = await this.postsRepository.findOne({ where: { id }});

    if (post) return post;

    throw new PostNotFoundException(id);
  }

  async createPost(post: CreatePostDto) {
    const newPost = await this.postsRepository.create(post);
    this.postsRepository.save(newPost);

    return newPost;
  }

  async updatePost(id: string, post: UpdatePostDto) {
    await this.postsRepository.update(id, post);
    const updatedPost = await this.postsRepository.findOne({ where: { id }});
    if (updatedPost) {
      return updatedPost;
    }

    throw new PostNotFoundException(id);
  }

  async deletePost(id: string) {
    const deletedResponse = await this.postsRepository.delete(id);

    if (!deletedResponse.affected) {
      throw new PostNotFoundException(id);
    }
  }

  private findPostIndex(id: string) {
    return this.posts.findIndex(post => post.id === id);
  }
}
