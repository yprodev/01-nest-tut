import { Post } from "../post.interface";

export default class UpdatePostDto implements Post {
  id: string;
  content: string;
  title: string;
}
