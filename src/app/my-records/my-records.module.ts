import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyRecordsRoutingModule } from './my-records-routing.module';
import { MyRecordsComponent } from './my-records.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MyRecordsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [MyRecordsComponent]
})
export class MyRecordsModule { }
