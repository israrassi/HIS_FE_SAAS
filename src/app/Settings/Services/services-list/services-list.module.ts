import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesListRoutingModule } from './services-list-routing.module';
import { ServicesListComponent } from './services-list.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ServicesListComponent
  ],
  imports: [
    CommonModule,
    ServicesListRoutingModule,
    SharedModule
  ]
})
export class ServicesListModule { }
