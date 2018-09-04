import { Injectable } from '@angular/core';
import { PatientConditions } from '../shared/model/patient-conditions.model';
import { PatientContacts } from '../shared/model/patient-contacts.model';
import { PatientBody } from '../shared/model/patient-body.model';

@Injectable({
  providedIn: 'root'
})
export class MyRecordsService {
dataSet:PatientConditions[]=[];
type:string;
contactSet:PatientContacts[]=[]
bodySet:PatientBody[]=[]
  constructor() { }
}
