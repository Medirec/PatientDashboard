import { Injectable } from '@angular/core';
import { PatientConditions } from '../shared/model/patient-conditions.model';

@Injectable({
  providedIn: 'root'
})
export class MyRecordsService {
dataSet:PatientConditions[]=[];
type:string;
  constructor() { }
}
