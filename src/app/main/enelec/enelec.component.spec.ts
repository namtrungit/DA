import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnelecComponent } from './enelec.component';

describe('EnelecComponent', () => {
  let component: EnelecComponent;
  let fixture: ComponentFixture<EnelecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnelecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnelecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
