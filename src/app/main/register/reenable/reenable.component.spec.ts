import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReenableComponent } from './reenable.component';

describe('ReenableComponent', () => {
  let component: ReenableComponent;
  let fixture: ComponentFixture<ReenableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReenableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReenableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
