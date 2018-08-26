import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyRecordsComponent } from './my-records.component';

const routes: Routes = [
  {path:'',component:MyRecordsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyRecordsRoutingModule { }
