import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import Category from "../categories/category.entity";
import User from "../users/user.entity";

@Entity()
class Post {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  public id: string;

  @Column()
  public title: string;

  @Column()
  public content: string;

  @Column({ nullable: true })
  public category?: string;

  @ManyToOne(() => User, (author: User) => author.posts)
  public author: User

  @ManyToMany(() => Category)
  @JoinTable()
  public categories: Category[]
}

export default Post;
