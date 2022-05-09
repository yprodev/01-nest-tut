import { Column, Entity, Generated, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Expose } from 'class-transformer';

import User from "./user.entity";

@Entity()
class Address {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  public id: string;

  @Column()
  @Expose()
  public street: string;

  @Column()
  @Expose()
  public city: string;

  @Column()
  @Expose()
  public country: string;

  @OneToOne(() => User, (user: User) => user.address)
  public user: User
}

export default Address;
