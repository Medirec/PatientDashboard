import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyRecordsComponent } from './my-records.component';
import { MyRecordsResolver } from './my-records.resolver';

const routes: Routes = [
  {path:'',component:MyRecordsComponent, resolve: {
    subscription: MyRecordsResolver
  }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyRecordsRoutingModule { }
