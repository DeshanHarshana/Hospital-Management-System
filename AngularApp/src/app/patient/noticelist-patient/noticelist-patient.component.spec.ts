import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticelistPatientComponent } from './noticelist-patient.component';

describe('NoticelistPatientComponent', () => {
  let component: NoticelistPatientComponent;
  let fixture: ComponentFixture<NoticelistPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticelistPatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticelistPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
