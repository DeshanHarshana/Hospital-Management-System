import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMedicalUnitComponent } from './show-medical-unit.component';

describe('ShowMedicalUnitComponent', () => {
  let component: ShowMedicalUnitComponent;
  let fixture: ComponentFixture<ShowMedicalUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowMedicalUnitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMedicalUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
