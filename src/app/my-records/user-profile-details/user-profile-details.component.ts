import { Component, OnInit } from '@angular/core';
import { PatientDetails } from '../../shared/model/patient-details.model';
import { UserService } from '../../shared/services/user-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile-details',
  templateUrl: './user-profile-details.component.html',
  styleUrls: ['./user-profile-details.component.css']
})
export class UserProfileDetailsComponent implements OnInit {
user:PatientDetails;
public userForm: FormGroup;
  constructor(private router: Router,private userService:UserService,formBuilder: FormBuilder) { 
    this.user={...userService.patientDetails}
    this.userForm = formBuilder.group({
      name: [this.user.fullName, [Validators.required]],
      age: [this.user.age, [Validators.required]],
      area: [this.user.areaName, [Validators.required]],
      city: [this.user.city, [Validators.required]],
      phoneNumber: [this.user.phoneNumber, [Validators.required]],
      gender: [this.user.gender, [Validators.required]],
    });
  }

  ngOnInit() {
  }
  submit(){
   this.userService.editPatient(this.user).subscribe(()=>{
    this.router.navigate(['/']);
   })
  }
}
