import {UserModel} from './user.model';
import {CommentModel} from './comment.model';

export class ArticleModel {
  id: number;
  user: UserModel;
  title: string;
  date: Date;
  body: string;
  comments: CommentModel[];
}
