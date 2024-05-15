import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentListRoutingModule } from './appointment-list-routing.module';
import { AppointmentListComponent } from './appointment-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FullCalendarModule } from '@fullcalendar/angular';


@NgModule({
  declarations: [
    AppointmentListComponent,
    // DayViewSchedulerCalendarUtils
  ],
  imports: [
    CommonModule,
    AppointmentListRoutingModule,
    SharedModule,
    // CalendarModule.forRoot({
    //   provide: DateAdapter,
    //   useFactory: adapterFactory,
    // })
  ]
})
export class AppointmentListModule { }
