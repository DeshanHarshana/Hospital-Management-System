import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticelistComponent } from './noticelist.component';

describe('NoticelistComponent', () => {
  let component: NoticelistComponent;
  let fixture: ComponentFixture<NoticelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticelistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
