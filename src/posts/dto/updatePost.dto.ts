import { IsString, IsNotEmpty, IsUUID, IsOptional } from 'class-validator';
import { Post } from "../post.interface";

export default class UpdatePostDto implements Post {
  @IsUUID('4')
  id: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  content: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title: string;
}
