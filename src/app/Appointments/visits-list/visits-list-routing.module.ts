import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisitsListComponent } from './visits-list.component';

const routes: Routes = [{ path: '', component: VisitsListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitsListRoutingModule { }
