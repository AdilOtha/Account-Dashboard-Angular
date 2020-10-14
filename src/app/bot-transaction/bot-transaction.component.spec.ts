import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotTransactionComponent } from './bot-transaction.component';

describe('BotTransactionComponent', () => {
  let component: BotTransactionComponent;
  let fixture: ComponentFixture<BotTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
