import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorshowComponent } from './doctorshow.component';

describe('DoctorshowComponent', () => {
  let component: DoctorshowComponent;
  let fixture: ComponentFixture<DoctorshowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorshowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
