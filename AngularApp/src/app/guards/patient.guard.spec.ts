import { TestBed } from '@angular/core/testing';

import { PatientGuard } from './patient.guard';

describe('PatientGuard', () => {
  let guard: PatientGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PatientGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
