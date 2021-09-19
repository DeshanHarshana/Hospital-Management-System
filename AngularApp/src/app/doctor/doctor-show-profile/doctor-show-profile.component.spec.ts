import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorShowProfileComponent } from './doctor-show-profile.component';

describe('DoctorShowProfileComponent', () => {
  let component: DoctorShowProfileComponent;
  let fixture: ComponentFixture<DoctorShowProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorShowProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorShowProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
