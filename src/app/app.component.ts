import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import {MatSnackBar} from '@angular/material'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private appService:AppService){
   
  
 
  }

OnInit(){
  
}
}
