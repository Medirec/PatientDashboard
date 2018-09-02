import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyRecordsRoutingModule } from './my-records-routing.module';
import { MyRecordsComponent } from './my-records.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { DetailsComponent } from './details/details.component';
import { UserProfileDetailsComponent } from './user-profile-details/user-profile-details.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
  CommonModule,
    MyRecordsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ChartsModule
  ],
  declarations: [MyRecordsComponent, DetailsComponent, UserProfileDetailsComponent, ]
})
export class MyRecordsModule { }
