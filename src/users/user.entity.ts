import { Column, Entity, Generated, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Expose } from 'class-transformer';
import Address from "./address.entity";

@Entity()
class User {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  public id?: string;

  @Column({ unique: true })
  @Expose()
  public email: string;

  @Column()
  @Expose()
  public name: string;

  @Column()
  public password: string;

  @OneToOne(() => Address)
  @JoinColumn()
  public address: Address
}

export default User;
