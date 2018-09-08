import { Component, OnInit } from '@angular/core';
import { PatientDetails } from '../../shared/model/patient-details.model';
import { UserService } from '../../shared/services/user-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';
import * as moment from 'moment';
import { MyRecordsService } from '../my-records.service';
declare let alertify:any;

@Component({
  selector: 'app-user-profile-details',
  templateUrl: './user-profile-details.component.html',
  styleUrls: ['./user-profile-details.component.css']
})
export class UserProfileDetailsComponent implements OnInit {
user:PatientDetails;
public userForm: FormGroup;
  constructor(private router: Router,private myRecordsService:MyRecordsService,private userService:UserService,formBuilder: FormBuilder,private appService:AppService) { 
    this.user={...userService.patientMoreDetails}
    this.userForm = formBuilder.group({
      name: [this.user.fullName, [Validators.required]],
      birthDate: [this.user.birthDate, [Validators.required]],
      area: [this.user.areaId, [Validators.required]],
      city: [this.user.cityId, [Validators.required]],
      phoneNumber: [this.user.phoneNumber, [Validators.required]],
      gender: [this.user.gender, [Validators.required]],
      address: [this.user.address, [Validators.required]],
    });
  }

  ngOnInit() {
  }
  selectChangeHandler(event){
    this.userService.area=[]

this.userService.GetAreas( event.target.value).subscribe()
  }
  submit(){
    this.appService.showLoader=true
  debugger
this.user.birthDate=moment(this.user.birthDate, "DD/MM/YYYY").add(1,'day').format("DD/MM/YYYY")
const date=this.user.birthDate.split('/')
this.user.birthDate=date[1]+'/'+date[0]+'/'+date[2]
   this.userService.editPatient(this.user).subscribe(()=>{
     this.appService.showLoader=false
    this.router.navigate(['/']);
    alertify.success('record successfully updated'); 

   },()=>{
    this.appService.showLoader=false
    alertify.error('sorry, somthing went wrong'); 

   })
  }
}
