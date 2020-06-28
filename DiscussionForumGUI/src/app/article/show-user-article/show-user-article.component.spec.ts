import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowUserArticleComponent } from './show-user-article.component';

describe('ShowUserArticleComponent', () => {
  let component: ShowUserArticleComponent;
  let fixture: ComponentFixture<ShowUserArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowUserArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowUserArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
