import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorAddPatientsComponent } from './doctor-add-patients.component';

describe('DoctorAddPatientsComponent', () => {
  let component: DoctorAddPatientsComponent;
  let fixture: ComponentFixture<DoctorAddPatientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorAddPatientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorAddPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
