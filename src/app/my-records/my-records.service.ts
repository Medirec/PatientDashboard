import { Injectable } from '@angular/core';
import { PatientConditions } from '../shared/model/patient-conditions.model';
import { PatientContacts } from '../shared/model/patient-contacts.model';
import { PatientBody } from '../shared/model/patient-body.model';
import { PatientImmunization } from '../shared/model/patient-immunization.model';

@Injectable({
  providedIn: 'root'
})
export class MyRecordsService {
dataSet:PatientConditions[]=[];
type:string;
contactSet:PatientContacts[]=[]
immunizationtSet:PatientImmunization[]=[]
bodySet:PatientBody[]=[]
  constructor() { }
}
