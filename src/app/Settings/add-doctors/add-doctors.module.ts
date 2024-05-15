import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddDoctorsRoutingModule } from './add-doctors-routing.module';
import { AddDoctorsComponent } from './add-doctors.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AddDoctorsComponent
  ],
  imports: [
    CommonModule,
    AddDoctorsRoutingModule,
    SharedModule
  ]
})
export class AddDoctorsModule { }
