import { randomUUID } from 'crypto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import UpdatePostDto from './dto/updatePost.dto';
import CreatePostDto from './dto/createPost.dto';
import { Post } from './post.interface';

const NOT_FOUND_MSG = 'Post not found';

@Injectable()
export class PostsService {
  private lastPostId = 0;
  private posts: Post[] = [];

  getAllPosts() {
    return this.posts;
  }

  getPostById(id: string) {
    const post = this.posts.find(post => post.id === id);

    if (post) return post;

    throw new HttpException(NOT_FOUND_MSG, HttpStatus.NOT_FOUND);
  }

  replacePost(id: string, post: UpdatePostDto) {
    const postIndex = this.findPostIndex(id);

    if (postIndex > -1) {
      this.posts[postIndex] = post;
      return post;
    }

    throw new HttpException(NOT_FOUND_MSG, HttpStatus.NOT_FOUND);
  }

  createPost(post: CreatePostDto) {
    const newPost: Post = {
      id: randomUUID(),
      ...post
    };
    this.posts.push(newPost);

    return newPost;
  }

  deletePost(id: string) {
    const postIndex = this.findPostIndex(id);

    if (postIndex > -1) {
      this.posts.splice(postIndex, 1);
    } else {
      throw new HttpException(NOT_FOUND_MSG, HttpStatus.NOT_FOUND);
    }
  }

  private findPostIndex(id: string) {
    return this.posts.findIndex(post => post.id === id);
  }
}
