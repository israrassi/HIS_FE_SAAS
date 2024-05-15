import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientsRoutingModule } from './patients-routing.module';
import { PatientsComponent } from './patients.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PatientsComponent
  ],
  imports: [
    CommonModule,
    PatientsRoutingModule,
    SharedModule
  ]
})
export class PatientsModule { }
