import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentCheckoutRoutingModule } from './payment-checkout-routing.module';
import { PaymentCheckoutComponent } from './payment-checkout.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PaymentCheckoutComponent
  ],
  imports: [
    CommonModule,
    PaymentCheckoutRoutingModule,
    SharedModule
  ]
})
export class PaymentCheckoutModule { }
