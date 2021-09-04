import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientShowProfileComponent } from './patient-show-profile.component';

describe('PatientShowProfileComponent', () => {
  let component: PatientShowProfileComponent;
  let fixture: ComponentFixture<PatientShowProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientShowProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientShowProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
