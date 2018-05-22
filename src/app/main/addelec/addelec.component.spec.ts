import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddelecComponent } from './addelec.component';

describe('AddelecComponent', () => {
  let component: AddelecComponent;
  let fixture: ComponentFixture<AddelecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddelecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddelecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
