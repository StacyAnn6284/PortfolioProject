import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlinkingCursor } from './blinking-cursor';

describe('BlinkingCursor', () => {
  let component: BlinkingCursor;
  let fixture: ComponentFixture<BlinkingCursor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlinkingCursor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlinkingCursor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
