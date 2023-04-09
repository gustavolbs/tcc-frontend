import { User } from "./user";

export interface Comment {
  id: number;
  text: string;
  createdAt: Date;
  issueId: number;
  authorId: number;
  parentId?: number;

  author: User;
  parent?: Comment;
  replies?: Comment[];
}
