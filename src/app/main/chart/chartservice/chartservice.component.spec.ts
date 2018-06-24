import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartserviceComponent } from './chartservice.component';

describe('ChartserviceComponent', () => {
  let component: ChartserviceComponent;
  let fixture: ComponentFixture<ChartserviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartserviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
