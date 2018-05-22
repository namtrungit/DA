import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiselecComponent } from './diselec.component';

describe('DiselecComponent', () => {
  let component: DiselecComponent;
  let fixture: ComponentFixture<DiselecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiselecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiselecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
