import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppoinmentDoctorListComponent } from './appoinment-doctor-list.component';

describe('AppoinmentDoctorListComponent', () => {
  let component: AppoinmentDoctorListComponent;
  let fixture: ComponentFixture<AppoinmentDoctorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppoinmentDoctorListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppoinmentDoctorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
