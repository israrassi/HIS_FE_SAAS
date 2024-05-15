import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisitsListRoutingModule } from './visits-list-routing.module';
import { VisitsListComponent } from './visits-list.component';


@NgModule({
  declarations: [
    VisitsListComponent
  ],
  imports: [
    CommonModule,
    VisitsListRoutingModule
  ]
})
export class VisitsListModule { }
