import { TestBed } from '@angular/core/testing';

import { MedicalunitService } from './medicalunit.service';

describe('MedicalunitService', () => {
  let service: MedicalunitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicalunitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
