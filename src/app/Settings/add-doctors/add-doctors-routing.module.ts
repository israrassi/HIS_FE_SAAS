import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDoctorsComponent } from './add-doctors.component';

const routes: Routes = [{ path: '', component: AddDoctorsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddDoctorsRoutingModule { }
