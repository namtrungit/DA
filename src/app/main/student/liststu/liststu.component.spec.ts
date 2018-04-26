import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListstuComponent } from './liststu.component';

describe('ListstuComponent', () => {
  let component: ListstuComponent;
  let fixture: ComponentFixture<ListstuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListstuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListstuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
