import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisitsCuComponent } from './visits-cu.component';

const routes: Routes = [{ path: '', component: VisitsCuComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitsCuRoutingModule { }
