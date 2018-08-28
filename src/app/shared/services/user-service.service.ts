import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';
import { throwError} from 'rxjs';
import { PatientDetails } from '../model/patient-details.model';
import * as JsonQuery from 'jsonpath/jsonpath.min';
import { JSON_PATHS} from '../constants/defines';
import { Gender } from '../enums/gender.enum';
import { PatientAllergies } from '../model/patient-allergies.model';
import { PatientConditions } from '../model/patient-conditions.model';
import { PatientPressure } from '../model/patient-pressure.model';
import { PatientBody } from '../model/patient-body.model';

@Injectable({
  providedIn: 'root'
})
export class UserService{
patientDetails:PatientDetails=new PatientDetails();
patientBody:PatientBody=new PatientBody();
patientAllergies:PatientAllergies[]=[];
patientConditions:PatientConditions[]=[];
patientPressures:PatientPressure[]=[];
patientCalculatedPressure:PatientPressure=new PatientPressure()
  constructor(private http: HttpClient) {

   }
    /**
   * Fetch Patient details 
   */
  GetPatientDetails(userId?: string) {

    let url = 'http://36765264api.medirec.me/api/Patients/3'
    let headers = new HttpHeaders();
    headers = headers.append('MedKey', '736db36f-7d1e-463c-bcec-15f9b1ca77f6'  );
    const options = {
      headers: headers
    };
    return this.http.get(url, options).pipe(map((res) => {
      if(res[0]){
        this.patientDetails.age=JsonQuery.value(res[0], JSON_PATHS.PATIENTDETAILS.AGE) || '';
        this.patientDetails.fullName=JsonQuery.value(res[0], JSON_PATHS.PATIENTDETAILS.FULLNAME) || '';
        this.patientDetails.city=JsonQuery.value(res[0], JSON_PATHS.PATIENTDETAILS.CITY) || '';
        this.patientDetails.areaName=JsonQuery.value(res[0], JSON_PATHS.PATIENTDETAILS.AREANAME) || '';
        this.patientDetails.patienCode=JsonQuery.value(res[0], JSON_PATHS.PATIENTDETAILS.PATIENTCODE) || '';
        this.patientDetails.imageUrl=JsonQuery.value(res[0], JSON_PATHS.PATIENTDETAILS.IMAGEURL) || '';
        if(JsonQuery.value(res[0], JSON_PATHS.PATIENTDETAILS.GENDER)){
          this.patientDetails.gender=JsonQuery.value(res[0], JSON_PATHS.PATIENTDETAILS.GENDER).toLowerCase()==='m'?Gender.Male:Gender.Female;
  
        }
      }
      return res;
    }
    ), catchError(e => throwError(e)) );
  }
    /**
   * Fetch Patient Allergies 
   */
  GetPatientAllergies(userId?: string) {

    let url = 'http://36765264api.medirec.me/api/Allergies/1'
    let headers = new HttpHeaders();
    headers = headers.append('MedKey', '736db36f-7d1e-463c-bcec-15f9b1ca77f6'  );
    const options = {
      headers: headers
    };
    return this.http.get(url, options).pipe(map((res:any[]) => {
      res.forEach(element => {
      let allergy=new PatientAllergies()
      allergy.allergiesName=JsonQuery.value(element, JSON_PATHS.PATIENTALLERGIES.ALLERGYNAME) || '';
      allergy.userId=JsonQuery.value(element, JSON_PATHS.PATIENTALLERGIES.USERID) || '';
      allergy.allergiesId=JsonQuery.value(element, JSON_PATHS.PATIENTALLERGIES.ID) || '';
     this.patientAllergies.push(allergy)
     });
     



      
      return res;
    }
    ), catchError(e => throwError(e)) );
  }
      /**
   * Fetch Patient conditions 
   */
  GetPatientConditions(userId?: string) {

    let url = 'http://36765264api.medirec.me/api/Condations/1';
    let headers = new HttpHeaders();
    headers = headers.append('MedKey', '736db36f-7d1e-463c-bcec-15f9b1ca77f6'  );
    const options = {
      headers: headers
    };
    return this.http.get(url, options).pipe(map((res:any[]) => {
      res.forEach(element => {
      let condition=new PatientConditions();
      condition.name=JsonQuery.value(element, JSON_PATHS.PATIENTCONDITIONS.NAME) || '';
      condition.userId=JsonQuery.value(element, JSON_PATHS.PATIENTCONDITIONS.USERID) || '';
      condition.id=JsonQuery.value(element, JSON_PATHS.PATIENTCONDITIONS.ID) || '';
     this.patientConditions.push(condition)
     });

      return res;
    }
    ), catchError(e => throwError(e)) );
  }
  GetPatientPressure(userId?: string) {

    let url = 'http://36765264api.medirec.me/api/BloodPressure/1';
    let headers = new HttpHeaders();
    headers = headers.append('MedKey', '736db36f-7d1e-463c-bcec-15f9b1ca77f6'  );
    const options = {
      headers: headers
    };
    return this.http.get(url, options).pipe(map((res:any[]) => {
      res.forEach(element => {
        let pressure=new PatientPressure();
        pressure.id=JsonQuery.value(element, JSON_PATHS.PATIENTPRESSURE.ID) || '';
        pressure.userId=JsonQuery.value(element, JSON_PATHS.PATIENTPRESSURE.USERID) || '';
        pressure.date=JsonQuery.value(element, JSON_PATHS.PATIENTPRESSURE.DATE) || '';
        pressure.diastolic=JsonQuery.value(element, JSON_PATHS.PATIENTPRESSURE.DIASTOLIC) || '';
        pressure.systolic=JsonQuery.value(element, JSON_PATHS.PATIENTPRESSURE.SYSTOLIC) || '';
       this.patientPressures.push(pressure)
       });
       console.log(this.patientPressures);
       
this.PressureCalculaion()
      return res;
    }
    ), catchError(e => throwError(e)) );
  }

  PressureCalculaion(){
    const maxSystolic=140;
    const minSystolic=90;
    const maxDiastolic=90;
    const minDiastolic=60;
if(this.patientPressures.length){
  let systolicSUM=0;
  let diastolicSUM=0;
  this.patientPressures.map(el=>{
systolicSUM+=+el.systolic
diastolicSUM+=+el.diastolic
  })
  this.patientCalculatedPressure.systolicAVG=Math.ceil(systolicSUM/this.patientPressures.length)
  this.patientCalculatedPressure.diastolicAVG=Math.ceil(diastolicSUM/this.patientPressures.length)
  this.patientCalculatedPressure.systolic=((systolicSUM/this.patientPressures.length)/maxSystolic)*100+"%"
  this.patientCalculatedPressure.diastolic=((diastolicSUM/this.patientPressures.length)/maxDiastolic)*100+"%"
  console.log(this.patientCalculatedPressure);
  
}
  }
  GetPatientBodyInfo(userId?: string) {

    let url = 'http://36765264api.medirec.me/api/HumanBodies/1'
    let headers = new HttpHeaders();
    headers = headers.append('MedKey', '736db36f-7d1e-463c-bcec-15f9b1ca77f6'  );
    const options = {
      headers: headers
    };
    return this.http.get(url, options).pipe(map((res) => {
     
        this.patientBody.id=JsonQuery.value(res, JSON_PATHS.PATIENTBODY.ID) || '';
        this.patientBody.userId=JsonQuery.value(res, JSON_PATHS.PATIENTBODY.USERID) || '';
        this.patientBody.weight=JsonQuery.value(res, JSON_PATHS.PATIENTBODY.WEIGHT) || '';
        this.patientBody.height=JsonQuery.value(res, JSON_PATHS.PATIENTBODY.HEIGHT) || '';
        this.patientBody.date=JsonQuery.value(res, JSON_PATHS.PATIENTBODY.DATE) || '';
      return res;
    }
    ), catchError(e => throwError(e)) );
  }
  addAllergies(allergy) {
    

    const url = 'http://36765264api.medirec.me/api/Allergies'
    let headers = new HttpHeaders();
    headers = headers.append('MedKey', '736db36f-7d1e-463c-bcec-15f9b1ca77f6'  );
    headers = headers.append('Content-Type', 'application/json');
    const options = {
      headers: headers
    };
    return this.http.post(url, allergy, options).pipe(map((res) => 
   { let allergyRes=new PatientAllergies()
    allergyRes.allergiesName=JsonQuery.value(res, JSON_PATHS.PATIENTALLERGIES.ALLERGYNAME) || '';
    allergyRes.userId=JsonQuery.value(res, JSON_PATHS.PATIENTALLERGIES.USERID) || '';
    allergyRes.allergiesId=JsonQuery.value(res, JSON_PATHS.PATIENTALLERGIES.ID) || '';
   this.patientAllergies.push(allergyRes)}
  ))
  }
  addConditions(condition) {
    

    const url = 'http://36765264api.medirec.me/api/Condations'
    let headers = new HttpHeaders();
    headers = headers.append('MedKey', '736db36f-7d1e-463c-bcec-15f9b1ca77f6'  );
    headers = headers.append('Content-Type', 'application/json');
    const options = {
      headers: headers
    };
    return this.http.post(url, condition, options).pipe(map((res) => 
   { let conditionRes=new PatientConditions()
    conditionRes.name=JsonQuery.value(res, JSON_PATHS.PATIENTALLERGIES.ALLERGYNAME) || '';
    conditionRes.userId=JsonQuery.value(res, JSON_PATHS.PATIENTALLERGIES.USERID) || '';
    conditionRes.id=JsonQuery.value(res, JSON_PATHS.PATIENTALLERGIES.ID) || '';
   this.patientConditions.push(conditionRes)}
  ))
  }
}
