import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditmedicineComponent } from './editmedicine.component';

describe('EditmedicineComponent', () => {
  let component: EditmedicineComponent;
  let fixture: ComponentFixture<EditmedicineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditmedicineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditmedicineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
