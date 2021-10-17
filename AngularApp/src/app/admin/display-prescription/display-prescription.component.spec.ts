import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayPrescriptionComponent } from './display-prescription.component';

describe('DisplayPrescriptionComponent', () => {
  let component: DisplayPrescriptionComponent;
  let fixture: ComponentFixture<DisplayPrescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayPrescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayPrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
