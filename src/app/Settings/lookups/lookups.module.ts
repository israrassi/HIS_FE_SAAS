import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LookupsRoutingModule } from './lookups-routing.module';
import { LookupsComponent } from './lookups.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    LookupsComponent
  ],
  imports: [
    CommonModule,
    LookupsRoutingModule,
    SharedModule
  ]
})
export class LookupsModule { }
