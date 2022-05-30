import { Column, Entity, Generated, JoinColumn, OneToOne, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Exclude } from 'class-transformer';

import Post from "../posts/post.entity";
import Address from "./address.entity";

@Entity()
class User {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  public id?: string;

  @Column({ unique: true })
  public email: string;

  @Column()
  public name: string;

  @Column()
  @Exclude()
  public password: string;

  @Column({ nullable: true })
  @Exclude()
  public currentHashedRefreshToken?: string;

  @OneToOne(() => Address, {
    eager: true,
    cascade: true
  })
  @JoinColumn()
  public address: Address

  @OneToMany(() => Post, (post: Post) => post.author)
  public posts: Post[];
}

export default User;
