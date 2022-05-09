import { Column, Entity, Generated, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import User from "./user.entity";

@Entity()
class Address {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  public id: string;

  @Column()
  public street: string;

  @Column()
  public city: string;

  @Column()
  public country: string;

  @OneToOne(() => User, (user: User) => user.address)
  public user: User;
}

export default Address;
