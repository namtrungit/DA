import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewscategoriesComponent } from './newscategories.component';

describe('NewscategoriesComponent', () => {
  let component: NewscategoriesComponent;
  let fixture: ComponentFixture<NewscategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewscategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewscategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
