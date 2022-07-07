import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequeestResetPatientComponent } from './requeest-reset-patient.component';

describe('RequeestResetPatientComponent', () => {
  let component: RequeestResetPatientComponent;
  let fixture: ComponentFixture<RequeestResetPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequeestResetPatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequeestResetPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
