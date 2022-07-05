import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestResetComponentComponent } from './request-reset-component.component';

describe('RequestResetComponentComponent', () => {
  let component: RequestResetComponentComponent;
  let fixture: ComponentFixture<RequestResetComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestResetComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestResetComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
