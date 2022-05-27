import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientPasswordResetComponent } from './patient-password-reset.component';

describe('PatientPasswordResetComponent', () => {
  let component: PatientPasswordResetComponent;
  let fixture: ComponentFixture<PatientPasswordResetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientPasswordResetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientPasswordResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
