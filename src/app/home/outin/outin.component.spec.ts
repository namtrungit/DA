import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutinComponent } from './outin.component';

describe('OutinComponent', () => {
  let component: OutinComponent;
  let fixture: ComponentFixture<OutinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
