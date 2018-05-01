import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StucontactComponent } from './stucontact.component';

describe('StucontactComponent', () => {
  let component: StucontactComponent;
  let fixture: ComponentFixture<StucontactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StucontactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StucontactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
