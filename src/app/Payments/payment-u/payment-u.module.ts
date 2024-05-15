import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentURoutingModule } from './payment-u-routing.module';
import { PaymentUComponent } from './payment-u.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PaymentUComponent
  ],
  imports: [
    CommonModule,
    PaymentURoutingModule,
    SharedModule
  ]
})
export class PaymentUModule { }
