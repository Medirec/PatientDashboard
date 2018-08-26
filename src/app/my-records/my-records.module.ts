import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyRecordsRoutingModule } from './my-records-routing.module';
import { MyRecordsComponent } from './my-records.component';

@NgModule({
  imports: [
    CommonModule,
    MyRecordsRoutingModule
  ],
  declarations: [MyRecordsComponent]
})
export class MyRecordsModule { }
