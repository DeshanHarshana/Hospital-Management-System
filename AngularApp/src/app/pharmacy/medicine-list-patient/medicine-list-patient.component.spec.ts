import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineListPatientComponent } from './medicine-list-patient.component';

describe('MedicineListPatientComponent', () => {
  let component: MedicineListPatientComponent;
  let fixture: ComponentFixture<MedicineListPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicineListPatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicineListPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
