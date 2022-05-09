import {
  Column,
  Entity,
  Generated,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn
} from "typeorm";

import Post from "../posts/post.entity";

@Entity()
class Category {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  public id?: string;

  @Column()
  public name: string;

  @ManyToMany(() => Post, (post: Post) => post.categories)
  @JoinTable()
  public posts: Post[]

}

export default Category;
