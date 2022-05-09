import { Column, Entity, Generated, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class Category {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  public id?: string;

  @Column()
  public name: string;
}

export default Category;
