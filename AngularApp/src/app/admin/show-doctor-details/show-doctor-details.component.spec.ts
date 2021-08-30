import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDoctorDetailsComponent } from './show-doctor-details.component';

describe('ShowDoctorDetailsComponent', () => {
  let component: ShowDoctorDetailsComponent;
  let fixture: ComponentFixture<ShowDoctorDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowDoctorDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDoctorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
