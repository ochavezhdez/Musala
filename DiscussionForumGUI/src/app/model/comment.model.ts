import {ArticleModel} from './article.model';

export class CommentModel {

  id: number;
  article: ArticleModel;
  body: string;

}
