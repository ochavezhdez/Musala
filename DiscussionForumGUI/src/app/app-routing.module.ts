import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ListArticleComponent} from './article/list-article/list-article.component';
import {AddArticleComponent} from './article/add-article/add-article.component';
import {ShowArticleComponent} from './article/show-article/show-article.component';
import {ListUserArticleComponent} from './article/list-user-article/list-user-article.component';
import {ShowUserArticleComponent} from './article/show-user-article/show-user-article.component';
import {EditArticleComponent} from './article/edit-article/edit-article.component';


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'list-user-article', component: ListUserArticleComponent},
  {path: 'list-article', component: ListArticleComponent},
  {path: 'add-article', component: AddArticleComponent},
  {path: 'show-user-article', component: ShowUserArticleComponent},
  {path: 'show-article', component: ShowArticleComponent},
  {path: 'edit-article', component: EditArticleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
