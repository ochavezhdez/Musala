import { Component, OnInit } from '@angular/core';
import {ArticleModel} from '../../model/article.model';
import {ArticleService} from '../article.service';

@Component({
  selector: 'app-show-user-article',
  templateUrl: './show-user-article.component.html',
  styleUrls: ['./show-user-article.component.css']
})
export class ShowUserArticleComponent implements OnInit {

  article: ArticleModel;

  constructor(private articleService: ArticleService) {
  }

  ngOnInit(): void {
    this.articleService.getRequest().subscribe(data => {
      this.article = (data as ArticleModel);
    });
  }

  exit(): void {
    this.articleService.listArticles();
  }

  deleteArticle(): void {
    this.articleService.deleteRequest(this.article);
  }

  editArticle(): void {
    this.articleService.editArticle(this.article);
  }

}
