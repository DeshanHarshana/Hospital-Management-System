import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDoctorDetailsComponent } from './edit-doctor-details.component';

describe('EditDoctorDetailsComponent', () => {
  let component: EditDoctorDetailsComponent;
  let fixture: ComponentFixture<EditDoctorDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDoctorDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDoctorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
