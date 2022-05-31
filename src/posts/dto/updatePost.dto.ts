import { IsString, IsNotEmpty, IsUUID, IsOptional } from 'class-validator';
import { Post } from "../post.interface";

export default class UpdatePostDto implements Post {
  @IsUUID('4')
  id: string;

  @IsString({ each: true })
  @IsNotEmpty()
  paragraphs: string[];

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title: string;
}
