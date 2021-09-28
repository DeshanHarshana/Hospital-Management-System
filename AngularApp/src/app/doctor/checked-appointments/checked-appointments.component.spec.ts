import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckedAppointmentsComponent } from './checked-appointments.component';

describe('CheckedAppointmentsComponent', () => {
  let component: CheckedAppointmentsComponent;
  let fixture: ComponentFixture<CheckedAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckedAppointmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckedAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
