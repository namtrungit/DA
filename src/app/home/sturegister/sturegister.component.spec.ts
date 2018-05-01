import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SturegisterComponent } from './sturegister.component';

describe('SturegisterComponent', () => {
  let component: SturegisterComponent;
  let fixture: ComponentFixture<SturegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SturegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SturegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
