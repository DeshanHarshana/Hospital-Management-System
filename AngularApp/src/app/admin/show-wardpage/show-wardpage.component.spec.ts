import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowWardpageComponent } from './show-wardpage.component';

describe('ShowWardpageComponent', () => {
  let component: ShowWardpageComponent;
  let fixture: ComponentFixture<ShowWardpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowWardpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowWardpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
