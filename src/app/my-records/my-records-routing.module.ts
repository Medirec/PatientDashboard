import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyRecordsComponent } from './my-records.component';
import { MyRecordsResolver } from './my-records.resolver';
import { DetailsComponent } from './details/details.component';
import { UserProfileDetailsComponent } from './user-profile-details/user-profile-details.component';

const routes: Routes = [
  {path:'',component:MyRecordsComponent, resolve: {
    subscription: MyRecordsResolver
  }
  },{
    path: 'Details',
    component: DetailsComponent,
  },{
    path: 'DetailsProfile',
    component: UserProfileDetailsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class MyRecordsRoutingModule { }
