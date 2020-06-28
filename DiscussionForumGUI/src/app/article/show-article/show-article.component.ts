import {Component, OnInit} from '@angular/core';
import {ArticleModel} from '../../model/article.model';
import {ArticleService} from '../article.service';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-show-article',
  templateUrl: './show-article.component.html',
  styleUrls: ['./show-article.component.css']
})
export class ShowArticleComponent implements OnInit {

  article: ArticleModel;
  addForm: FormGroup;

  constructor(private articleService: ArticleService) {
  }

  ngOnInit(): void {
    this.addForm = this.articleService.getFormComment();
    this.articleService.getRequest().subscribe(data => {
      this.article = (data as ArticleModel);
    });
  }

  onSubmit() {
    this.articleService.addRequestComment(this.addForm);
  }

  exit(): void {
    this.articleService.listArticles();
  }

}
