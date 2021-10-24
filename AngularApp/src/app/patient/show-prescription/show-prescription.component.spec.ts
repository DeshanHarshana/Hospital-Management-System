import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPrescriptionComponent } from './show-prescription.component';

describe('ShowPrescriptionComponent', () => {
  let component: ShowPrescriptionComponent;
  let fixture: ComponentFixture<ShowPrescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPrescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
