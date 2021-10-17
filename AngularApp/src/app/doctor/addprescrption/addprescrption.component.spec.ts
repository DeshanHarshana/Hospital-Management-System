import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddprescrptionComponent } from './addprescrption.component';

describe('AddprescrptionComponent', () => {
  let component: AddprescrptionComponent;
  let fixture: ComponentFixture<AddprescrptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddprescrptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddprescrptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
