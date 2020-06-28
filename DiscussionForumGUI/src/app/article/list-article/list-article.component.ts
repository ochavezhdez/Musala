import {Component, OnInit} from '@angular/core';
import {ArticleModel} from '../../model/article.model';
import {ArticleService} from '../article.service';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.css']
})
export class ListArticleComponent implements OnInit {

  articles: ArticleModel[];
  articlesFiltered: ArticleModel[];
  articlesPagined: ArticleModel[];
  pageSize = 5;
  pageSizeOptions = [5, 10, 25, 100];

  constructor(private articleService: ArticleService) {
  }

  ngOnInit(): void {
    this.articleService.listRequest().subscribe(data => {
      this.articles = (data as ArticleModel[]).sort((a, b) => a.date > b.date ? 1 : -1);
      this.find(undefined);
    });
  }

  showArticle(article: ArticleModel): void {
    this.articleService.showArticle(article);
  }

  subList(pageIndex: number, pageSize: number) {
    this.articlesPagined = this.articlesFiltered.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);
  }

  page(event: PageEvent) {
    this.subList(event.pageIndex, event.pageSize);
  }

  find(value: any) {
    if (value) {
      this.articlesFiltered = this.articles.filter(s => {
        return s.title.includes(value);
      });
    } else {
      this.articlesFiltered = this.articles;
    }

    this.pageSize = 5;
    this.subList(0, this.pageSize);
  }

  isEmptyList(): boolean {
    return this.articles === undefined || this.articles.length > 0;
  }

}
