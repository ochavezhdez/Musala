import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ArticleService} from '../article.service';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {

  addForm: FormGroup;

  constructor(private articleService: ArticleService) {
  }

  ngOnInit(): void {
    this.addForm = this.articleService.getFormArticle();
  }

  onSubmit() {
    this.articleService.addRequestArticle(this.addForm);
  }

  cancel(): void {
    this.articleService.listArticles();
  }

}
