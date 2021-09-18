import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPatientListComponent } from './all-patient-list.component';

describe('AllPatientListComponent', () => {
  let component: AllPatientListComponent;
  let fixture: ComponentFixture<AllPatientListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllPatientListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPatientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
