import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitPaymentComponent } from './split-payment.component';

describe('SplitPaymentComponent', () => {
  let component: SplitPaymentComponent;
  let fixture: ComponentFixture<SplitPaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SplitPaymentComponent]
    });
    fixture = TestBed.createComponent(SplitPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
