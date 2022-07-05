import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseResetPatientComponent } from './response-reset-patient.component';

describe('ResponseResetPatientComponent', () => {
  let component: ResponseResetPatientComponent;
  let fixture: ComponentFixture<ResponseResetPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponseResetPatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseResetPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
