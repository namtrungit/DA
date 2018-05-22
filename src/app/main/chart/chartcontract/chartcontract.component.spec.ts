import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartcontractComponent } from './chartcontract.component';

describe('ChartcontractComponent', () => {
  let component: ChartcontractComponent;
  let fixture: ComponentFixture<ChartcontractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartcontractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartcontractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
