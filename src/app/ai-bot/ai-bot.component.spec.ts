import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AiBotComponent } from './ai-bot.component';

describe('AiBotComponent', () => {
  let component: AiBotComponent;
  let fixture: ComponentFixture<AiBotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AiBotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AiBotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
