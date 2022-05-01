import { Column, Entity, Generated, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class Post {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  public id: string;

  @Column()
  public title: string;

  @Column()
  public content: string;
}

export default Post;
