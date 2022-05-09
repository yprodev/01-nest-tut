import { IsString, IsNotEmpty, IsUUID } from 'class-validator';
import { Category } from "../category.interface";

export default class UpdateCategorytDto implements Category {
  @IsUUID('4')
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
