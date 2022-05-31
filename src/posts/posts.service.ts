import { randomUUID } from 'crypto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import UpdatePostDto from './dto/updatePost.dto';
import CreatePostDto from './dto/createPost.dto';
import { Post } from './post.interface';
import PostEntity from './post.entity';
import { PostNotFoundException } from './exception/postNotFound.exception';
import User from '../users/user.entity';


const NOT_FOUND_MSG = 'Post not found';

@Injectable()
export class PostsService {
  private posts: Post[] = [];

  constructor(@InjectRepository(PostEntity) private postsRepository: Repository<PostEntity>) {}

  async getAllPosts() {
    return await this.postsRepository.find({ relations: ['author']});
  }

  async getPostById(id: string) {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ['author']
    });

    if (post) return post;

    throw new PostNotFoundException(id);
  }

  async createPost(post: CreatePostDto, user: User) {
    const newPost = await this.postsRepository.create({
      ...post,
      author: user
    });
    await this.postsRepository.save(newPost);

    return newPost;
  }

  async updatePost(id: string, post: UpdatePostDto) {
    await this.postsRepository.update(id, post);
    const updatedPost = await this.postsRepository.findOne({
      where: { id },
      relations: ['author']
    });
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

  async getPostsWithParagraph(paragraph: string) {
    return this.postsRepository.query('SELECT * FROM post WHERE $1 = ANY(paragraphs)', [paragraph]);
  }
}
