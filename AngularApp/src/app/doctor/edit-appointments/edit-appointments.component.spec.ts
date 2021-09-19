import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAppointmentsComponent } from './edit-appointments.component';

describe('EditAppointmentsComponent', () => {
  let component: EditAppointmentsComponent;
  let fixture: ComponentFixture<EditAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAppointmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
