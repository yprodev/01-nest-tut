import { Column, Entity, Generated, PrimaryGeneratedColumn } from "typeorm";

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
}

export default Address;
