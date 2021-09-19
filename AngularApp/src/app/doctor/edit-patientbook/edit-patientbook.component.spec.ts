import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPatientbookComponent } from './edit-patientbook.component';

describe('EditPatientbookComponent', () => {
  let component: EditPatientbookComponent;
  let fixture: ComponentFixture<EditPatientbookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPatientbookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPatientbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
