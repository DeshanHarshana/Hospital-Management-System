import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientBillComponent } from './patient-bill.component';

describe('PatientBillComponent', () => {
  let component: PatientBillComponent;
  let fixture: ComponentFixture<PatientBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientBillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
