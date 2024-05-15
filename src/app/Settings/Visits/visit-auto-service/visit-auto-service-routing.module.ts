import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisitAutoServiceComponent } from './visit-auto-service.component';

const routes: Routes = [{ path: '', component: VisitAutoServiceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitAutoServiceRoutingModule { }
