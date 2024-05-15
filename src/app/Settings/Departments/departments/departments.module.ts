import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentsRoutingModule } from './departments-routing.module';
import { DepartmentsComponent } from './departments.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    DepartmentsComponent
  ],
  imports: [
    CommonModule,
    DepartmentsRoutingModule,
    SharedModule
  ]
})
export class DepartmentsModule { }
