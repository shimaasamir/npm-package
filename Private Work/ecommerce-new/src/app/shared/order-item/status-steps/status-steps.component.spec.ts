import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusStepsComponent } from './status-steps.component';

describe('StatusStepsComponent', () => {
  let component: StatusStepsComponent;
  let fixture: ComponentFixture<StatusStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusStepsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
