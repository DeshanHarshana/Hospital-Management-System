import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhamasistListComponent } from './phamasist-list.component';

describe('PhamasistListComponent', () => {
  let component: PhamasistListComponent;
  let fixture: ComponentFixture<PhamasistListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhamasistListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhamasistListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
