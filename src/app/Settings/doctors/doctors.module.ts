import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorsRoutingModule } from './doctors-routing.module';
import { DoctorsComponent } from './doctors.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    DoctorsComponent
  ],
  imports: [
    CommonModule,
    DoctorsRoutingModule,
    SharedModule
  ]
})
export class DoctorsModule { }
