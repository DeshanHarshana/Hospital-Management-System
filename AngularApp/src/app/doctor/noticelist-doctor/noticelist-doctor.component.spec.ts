import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticelistDoctorComponent } from './noticelist-doctor.component';

describe('NoticelistDoctorComponent', () => {
  let component: NoticelistDoctorComponent;
  let fixture: ComponentFixture<NoticelistDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticelistDoctorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticelistDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
