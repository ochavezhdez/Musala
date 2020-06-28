import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ArticleService} from '../article.service';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {

  editForm: FormGroup;

  constructor(private articleService: ArticleService) {
  }

  ngOnInit(): void {
    this.editForm = this.articleService.getFormArticle();
    this.articleService.getRequest().subscribe(data => {
      this.editForm.setValue(data);
    });
  }

  onSubmit() {
    this.articleService.editRequest(this.editForm);
  }

  cancelar(): void {
    this.articleService.showUserArticle(this.editForm.value);
  }

}
