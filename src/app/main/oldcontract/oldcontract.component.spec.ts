import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OldcontractComponent } from './oldcontract.component';

describe('OldcontractComponent', () => {
  let component: OldcontractComponent;
  let fixture: ComponentFixture<OldcontractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OldcontractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OldcontractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
