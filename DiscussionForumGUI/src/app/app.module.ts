import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {ListArticleComponent} from './article/list-article/list-article.component';
import {TokenInterceptor} from './token-interceptor';
import { AddArticleComponent } from './article/add-article/add-article.component';
import { ShowArticleComponent } from './article/show-article/show-article.component';
import { ListUserArticleComponent } from './article/list-user-article/list-user-article.component';
import { ShowUserArticleComponent } from './article/show-user-article/show-user-article.component';
import { EditArticleComponent } from './article/edit-article/edit-article.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListArticleComponent,
    AddArticleComponent,
    ShowArticleComponent,
    ListUserArticleComponent,
    ShowUserArticleComponent,
    EditArticleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatPaginatorModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
