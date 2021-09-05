import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientEditProfileComponent } from './patient-edit-profile.component';

describe('PatientEditProfileComponent', () => {
  let component: PatientEditProfileComponent;
  let fixture: ComponentFixture<PatientEditProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientEditProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientEditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
