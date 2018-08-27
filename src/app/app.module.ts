import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyRecordsModule } from './my-records/my-records.module';
import { HttpClientModule } from '@angular/common/http';
import { MyRecordsResolver } from './my-records/my-records.resolver';
import { ModalModule } from 'ngx-bootstrap';
import { AppService } from './app.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
  BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MyRecordsModule,
    ModalModule.forRoot(),
    FormsModule
  ],
    providers: [MyRecordsResolver,AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
