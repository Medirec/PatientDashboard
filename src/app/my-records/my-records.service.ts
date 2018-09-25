import { Injectable } from '@angular/core';
import { PatientConditions } from '../shared/model/patient-conditions.model';
import { PatientContacts } from '../shared/model/patient-contacts.model';
import { PatientBody } from '../shared/model/patient-body.model';
import { PatientImmunization } from '../shared/model/patient-immunization.model';
import { PatientPressure } from '../shared/model/patient-pressure.model';
import { PatientResources } from '../shared/model/patient-resources.model';

@Injectable({
  providedIn: 'root'
})
export class MyRecordsService {
dataSet:PatientConditions[]=[];
type:string;
contactSet:PatientContacts[]=[]
immunizationtSet:PatientImmunization[]=[]
bodySet:PatientBody[]=[]
pressureSet:PatientPressure[]=[]
resourceSet:PatientResources[]=[]
  constructor() { }
  ConvertDate(str){
    var date = new Date(str);
    var day = date.getDate();       // yields date
    var month = date.getMonth() + 1;    // yields month (add one as '.getMonth()' is zero indexed)
    var year = date.getFullYear();  // yields year
    var hour = date.getHours();     // yields hours 
    var minute = date.getMinutes(); // yields minutes
    var second = date.getSeconds(); // yields seconds
    
    // After this construct a string with the above results as below
    var time = month + "/" + day + "/" + year + " " + hour + ':' + minute + ':' + second; 
    return time
  }
}
