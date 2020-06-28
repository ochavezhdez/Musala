import {ApiService} from '../api.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ArticleModel} from '../model/article.model';
import {Observable} from 'rxjs';
import {first} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {UserModel} from '../model/user.model';
import {CommentModel} from '../model/comment.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  urlArticle = 'article/';
  urlComment = 'comment';

  constructor(private apiService: ApiService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  getFormArticle(): FormGroup {
    return this.formBuilder.group({
      id: [''],
      title: ['', Validators.required],
      user: [''],
      date: [''],
      body: ['', Validators.required],
      comments: ['']
    });
  }

  getFormComment(): FormGroup {
    return this.formBuilder.group({
      id: [''],
      body: ['', Validators.required]
    });
  }

  listArticles(): void {
    this.router.navigate(['list-user-article']);
  }

  addAticle(): void {
    this.router.navigate(['add-article']);
  }

  editArticle(article: ArticleModel): void {
    window.localStorage.removeItem('articleId');
    window.localStorage.setItem('articleId', article.id.toString());
    this.router.navigate(['edit-article']);
  }

  showArticle(article: ArticleModel): void {
    window.localStorage.removeItem('articleId');
    window.localStorage.setItem('articleId', article.id.toString());
    this.router.navigate(['show-article']);
  }

  showUserArticle(article: ArticleModel): void {
    window.localStorage.removeItem('articleId');
    window.localStorage.setItem('articleId', article.id.toString());
    this.router.navigate(['show-user-article']);
  }

  listRequest(): Observable<any> {
    return this.apiService.getRequest(this.urlArticle);
  }

  listRequestByUser(): Observable<any> {
    const userId = window.localStorage.getItem('userId');
    if (!userId) {
      alert('Invalid action.');
      this.listArticles();
      return;
    }
    return this.apiService.getRequestById(this.urlArticle + 'user/', +userId);
  }

  getRequest(): Observable<any> {
    const articleId = window.localStorage.getItem('articleId');
    if (!articleId) {
      alert('Invalid action.');
      this.listArticles();
      return;
    }

    return this.apiService.getRequestById(this.urlArticle, +articleId);
  }

  addRequestArticle(addForm: FormGroup): void {
    if (addForm.invalid) {
      alert('All fields are required.');
      return;
    }

    if (confirm('Do you want to add the article?')) {
      (addForm.value as ArticleModel).date = new Date();
      const user = new UserModel();
      user.id = +window.localStorage.getItem('userId');
      (addForm.value as ArticleModel).user = user;
      this.apiService.postRequest(this.urlArticle, addForm.value).pipe(first()).subscribe(
        data => {
          alert('Article ' + (data as ArticleModel).title + ' added successfully.');
          this.listArticles();
        });
    }
  }

  addRequestComment(addForm: FormGroup): void {
    if (addForm.invalid) {
      alert('All fields are required.');
      return;
    }

    if (confirm('Do you want to add the comment?')) {
      const article = new ArticleModel();
      article.id = +window.localStorage.getItem('articleId');
      (addForm.value as CommentModel).article = article;

      this.apiService.postRequest(this.urlComment, addForm.value).pipe(first()).subscribe(
        data => {
          alert('Comment added successfully.');
          this.router.navigate(['list-article']);
        });
    }
  }

  editRequest(editForm: FormGroup): void {
    if (editForm.invalid) {
      alert('All fields are required.');
      return;
    }

    if (confirm('Do you want to update the article?')) {
      (editForm.value as ArticleModel).date = new Date();
      this.apiService.putRequest(this.urlArticle, editForm.value).pipe(first()).subscribe(
        data => {
          alert('Article ' + (data as ArticleModel).title + ' updated successfully.');
          this.listArticles();
        });
    }
  }

  deleteRequest(article: ArticleModel): void {
    if (confirm('Do you want to delete the ' + article.title + '?')) {
      this.apiService.deleteRequest(this.urlArticle, article.id).subscribe(data => {
        alert('Article ' + (data as ArticleModel).title + ' deleted successfully.');
        this.listArticles();
      });
    }
  }

}
