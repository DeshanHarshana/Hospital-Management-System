import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorAppoinmentlistComponent } from './doctor-appoinmentlist.component';

describe('DoctorAppoinmentlistComponent', () => {
  let component: DoctorAppoinmentlistComponent;
  let fixture: ComponentFixture<DoctorAppoinmentlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorAppoinmentlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorAppoinmentlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
