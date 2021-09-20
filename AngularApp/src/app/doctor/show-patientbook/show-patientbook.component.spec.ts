import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPatientbookComponent } from './show-patientbook.component';

describe('ShowPatientbookComponent', () => {
  let component: ShowPatientbookComponent;
  let fixture: ComponentFixture<ShowPatientbookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPatientbookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPatientbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
