import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaypriceComponent } from './stayprice.component';

describe('StaypriceComponent', () => {
  let component: StaypriceComponent;
  let fixture: ComponentFixture<StaypriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaypriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaypriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
