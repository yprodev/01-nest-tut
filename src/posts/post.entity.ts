import { Transform } from "class-transformer";
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

  @Column({ nullable: true })
  @Transform(value => {
    if (value !== null) {
      return value;
    }
  })
  public category?: string;
}

export default Post;
