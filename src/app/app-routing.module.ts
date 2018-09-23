import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  {path:'myRecord', loadChildren: "./my-records/my-records.module#MyRecordsModule"},
  
];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
