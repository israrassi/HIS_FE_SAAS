import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentListRoutingModule } from './appointment-list-routing.module';
import { AppointmentListComponent } from './appointment-list.component';


@NgModule({
  declarations: [
    AppointmentListComponent
  ],
  imports: [
    CommonModule,
    AppointmentListRoutingModule
  ]
})
export class AppointmentListModule { }
