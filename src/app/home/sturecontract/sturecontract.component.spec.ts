import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SturecontractComponent } from './sturecontract.component';

describe('SturecontractComponent', () => {
  let component: SturecontractComponent;
  let fixture: ComponentFixture<SturecontractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SturecontractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SturecontractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
