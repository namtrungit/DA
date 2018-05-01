import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedisableComponent } from './redisable.component';

describe('RedisableComponent', () => {
  let component: RedisableComponent;
  let fixture: ComponentFixture<RedisableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedisableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedisableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
