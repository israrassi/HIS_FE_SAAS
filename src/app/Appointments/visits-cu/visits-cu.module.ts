import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisitsCuRoutingModule } from './visits-cu-routing.module';
import { VisitsCuComponent } from './visits-cu.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddPatientsModule } from 'src/app/Settings/add-patients/add-patients.module';


@NgModule({
  declarations: [
    VisitsCuComponent
  ],
  imports: [
    CommonModule,
    VisitsCuRoutingModule,
    SharedModule,
    AddPatientsModule
  ],
  exports: [AddPatientsModule]
})
export class VisitsCuModule { }
