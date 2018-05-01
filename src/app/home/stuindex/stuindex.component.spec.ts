import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StuindexComponent } from './stuindex.component';

describe('StuindexComponent', () => {
  let component: StuindexComponent;
  let fixture: ComponentFixture<StuindexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StuindexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StuindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
