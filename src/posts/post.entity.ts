import { Transform } from "class-transformer";
import { Column, Entity, Generated, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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
}

export default Post;
