import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddPatientsRoutingModule } from './add-patients-routing.module';
import { AddPatientsComponent } from './add-patients.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AddPatientsComponent
  ],
  imports: [
    CommonModule,
    AddPatientsRoutingModule,
    SharedModule
  ],
  exports: [AddPatientsComponent]
})
export class AddPatientsModule { }
