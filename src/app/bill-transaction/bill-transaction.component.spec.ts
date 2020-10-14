import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillTransactionComponent } from './bill-transaction.component';

describe('BillTransactionComponent', () => {
  let component: BillTransactionComponent;
  let fixture: ComponentFixture<BillTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
