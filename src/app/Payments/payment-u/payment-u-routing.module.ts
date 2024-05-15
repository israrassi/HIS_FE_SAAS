import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentUComponent } from './payment-u.component';

const routes: Routes = [{ path: '', component: PaymentUComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentURoutingModule { }
