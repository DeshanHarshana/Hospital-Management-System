import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReminderComponent } from './edit-reminder.component';

describe('EditReminderComponent', () => {
  let component: EditReminderComponent;
  let fixture: ComponentFixture<EditReminderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditReminderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditReminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
