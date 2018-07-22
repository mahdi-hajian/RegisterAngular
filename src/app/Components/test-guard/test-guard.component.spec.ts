import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestGuardComponent } from './test-guard.component';

describe('TestGuardComponent', () => {
  let component: TestGuardComponent;
  let fixture: ComponentFixture<TestGuardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestGuardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestGuardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
