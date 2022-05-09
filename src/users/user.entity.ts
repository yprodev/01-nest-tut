import { Column, Entity, Generated, PrimaryGeneratedColumn } from "typeorm";
import { Expose } from 'class-transformer';

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
}

export default User;
