import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentSummaryComponent } from './payment-summary.component';

describe('PaymentSummaryComponent', () => {
  let component: PaymentSummaryComponent;
  let fixture: ComponentFixture<PaymentSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentSummaryComponent]
    });
    fixture = TestBed.createComponent(PaymentSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
