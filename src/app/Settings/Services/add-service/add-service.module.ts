import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddServiceRoutingModule } from './add-service-routing.module';
import { AddServiceComponent } from './add-service.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AddServiceComponent
  ],
  imports: [
    CommonModule,
    AddServiceRoutingModule,
    SharedModule
  ]
})
export class AddServiceModule { }
