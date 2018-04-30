import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractregComponent } from './contractreg.component';

describe('ContractregComponent', () => {
  let component: ContractregComponent;
  let fixture: ComponentFixture<ContractregComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractregComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractregComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
