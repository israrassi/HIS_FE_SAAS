import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisitAutoServiceRoutingModule } from './visit-auto-service-routing.module';
import { VisitAutoServiceComponent } from './visit-auto-service.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    VisitAutoServiceComponent
  ],
  imports: [
    CommonModule,
    VisitAutoServiceRoutingModule,
    SharedModule
  ]
})
export class VisitAutoServiceModule { }
