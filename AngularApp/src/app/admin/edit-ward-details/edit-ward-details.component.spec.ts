import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWardDetailsComponent } from './edit-ward-details.component';

describe('EditWardDetailsComponent', () => {
  let component: EditWardDetailsComponent;
  let fixture: ComponentFixture<EditWardDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditWardDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
