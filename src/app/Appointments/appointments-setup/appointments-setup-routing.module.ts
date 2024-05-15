import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentsSetupComponent } from './appointments-setup.component';

const routes: Routes = [{ path: '', component: AppointmentsSetupComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentsSetupRoutingModule { }
