import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SturuleComponent } from './sturule.component';

describe('SturuleComponent', () => {
  let component: SturuleComponent;
  let fixture: ComponentFixture<SturuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SturuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SturuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
