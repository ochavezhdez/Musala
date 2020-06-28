import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUserArticleComponent } from './list-user-article.component';

describe('ListUserArticleComponent', () => {
  let component: ListUserArticleComponent;
  let fixture: ComponentFixture<ListUserArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListUserArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUserArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
