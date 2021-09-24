import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorTimetableComponent } from './doctor-timetable.component';

describe('DoctorTimetableComponent', () => {
  let component: DoctorTimetableComponent;
  let fixture: ComponentFixture<DoctorTimetableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorTimetableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorTimetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
