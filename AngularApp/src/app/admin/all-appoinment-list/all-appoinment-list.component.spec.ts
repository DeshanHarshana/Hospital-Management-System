import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAppoinmentListComponent } from './all-appoinment-list.component';

describe('AllAppoinmentListComponent', () => {
  let component: AllAppoinmentListComponent;
  let fixture: ComponentFixture<AllAppoinmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllAppoinmentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllAppoinmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
