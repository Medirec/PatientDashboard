import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyRecordsModule } from './my-records/my-records.module';
import { HttpClientModule } from '@angular/common/http';
import { MyRecordsResolver } from './my-records/my-records.resolver';
import { ModalModule } from 'ngx-bootstrap';
import { AppService } from './app.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgDatepickerModule } from 'ng2-datepicker';
import { SharedModule } from './shared/shared.module';
import { MyRecordsService } from './my-records/my-records.service';
import {SnackbarModule} from 'ngx-snackbar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatSnackBar, MatSnackBarModule } from '@angular/material';;
import { OverlayModule } from "@angular/cdk/overlay";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MyRecordsModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    AngularFontAwesomeModule,
    NgDatepickerModule,
    SharedModule,
    SnackbarModule.forRoot(),
    MatSnackBarModule
  ],
    providers: [MyRecordsResolver,AppService,MyRecordsService,MatSnackBar],
  bootstrap: [AppComponent]
})
export class AppModule { }
