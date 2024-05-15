import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentsSetupRoutingModule } from './appointments-setup-routing.module';
import { AppointmentsSetupComponent } from './appointments-setup.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AppointmentsSetupComponent
  ],
  imports: [
    CommonModule,
    AppointmentsSetupRoutingModule,
    SharedModule
  ]
})
export class AppointmentsSetupModule { }
