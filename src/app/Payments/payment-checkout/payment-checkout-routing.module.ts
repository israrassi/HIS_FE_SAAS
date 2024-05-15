import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentCheckoutComponent } from './payment-checkout.component';

const routes: Routes = [{ path: '', component: PaymentCheckoutComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentCheckoutRoutingModule { }
