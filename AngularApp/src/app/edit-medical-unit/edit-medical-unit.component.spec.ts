import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMedicalUnitComponent } from './edit-medical-unit.component';

describe('EditMedicalUnitComponent', () => {
  let component: EditMedicalUnitComponent;
  let fixture: ComponentFixture<EditMedicalUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMedicalUnitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMedicalUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
