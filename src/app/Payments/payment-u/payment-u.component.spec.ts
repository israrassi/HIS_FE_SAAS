import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentUComponent } from './payment-u.component';

describe('PaymentUComponent', () => {
  let component: PaymentUComponent;
  let fixture: ComponentFixture<PaymentUComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentUComponent]
    });
    fixture = TestBed.createComponent(PaymentUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
