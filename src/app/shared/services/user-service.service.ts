import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';
import { throwError} from 'rxjs';
import { PatientDetails } from '../model/patient-details.model';
import * as JsonQuery from 'jsonpath/jsonpath.min';
import { JSON_PATHS} from '../constants/defines';
import { Gender } from '../enums/gender.enum';
import { PatientConditions } from '../model/patient-conditions.model';
import { PatientPressure } from '../model/patient-pressure.model';
import { PatientBody } from '../model/patient-body.model';
import * as moment from 'moment';
import { PatientContacts } from '../model/patient-contacts.model';
import { PatientImmunization } from '../model/patient-immunization.model';

@Injectable({
  providedIn: 'root'
})
export class UserService{
patientDetails:PatientDetails;
patientBody:PatientBody=new PatientBody();
patientAllergies:PatientConditions[]=[];
patientAllergiesDetails:PatientConditions[]=[];
patientConditions:PatientConditions[]=[];
patientConditionsDetails:PatientConditions[]=[];
patientMedication:PatientConditions[]=[];
patientMedicationDetails:PatientConditions[]=[];
patientMedicalDevice:PatientConditions[]=[];
patientMedicalDeviceDetails:PatientConditions[]=[];
patientPressures:PatientPressure[]=[];
patientPressuresDetails:PatientPressure[]=[];
patientContacts:PatientContacts[]=[];
patientContactsDetails:PatientContacts[]=[];
patientImmunization:PatientImmunization[]=[];
patientCalculatedPressure:PatientPressure=new PatientPressure();
resourcesCount:number;
medicalDeviceCount:number;
medicationCount:number;
humanBodiesCount:number;
allergiesCount:number;
conditionsCount:number;
bloodPressureCount:number;
immunizationsCount:number;
contactsCount:number;
  constructor(private http: HttpClient) {

   }
    /**
   * Fetch Patient details 
   */
  GetPatientDetails(userId?: string) {
    this.patientDetails=new PatientDetails();
    let url = 'http://36765264api.medirec.me/api/Patients/3'
    let headers = new HttpHeaders();
    headers = headers.append('MedKey', '736db36f-7d1e-463c-bcec-15f9b1ca77f6'  );
    const options = {
      headers: headers
    };
    this.patientDetails=new PatientDetails();
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
    this.patientAllergies=[]
    let url = 'http://36765264api.medirec.me/api/Allergies/1'
    let headers = new HttpHeaders();
    headers = headers.append('MedKey', '736db36f-7d1e-463c-bcec-15f9b1ca77f6'  );
    const options = {
      headers: headers
    };
    return this.http.get(url, options).pipe(map((res:any[]) => {
      res.forEach(element => {
      let allergy=new PatientConditions()
      allergy.name=JsonQuery.value(element, JSON_PATHS.PATIENTALLERGIES.ALLERGYNAME) || '';
      allergy.userId=JsonQuery.value(element, JSON_PATHS.PATIENTALLERGIES.USERID) || '';
      allergy.id=JsonQuery.value(element, JSON_PATHS.PATIENTALLERGIES.ID) || '';
     this.patientAllergies.push(allergy)
     });
     



      
      return res;
    }
    ), catchError(e => throwError(e)) );
  }
  GetPatientImmunization(userId?: string) {
    this.patientImmunization=[]
    let url = 'http://36765264api.medirec.me/api/Immunizations/1'
    let headers = new HttpHeaders();
    headers = headers.append('MedKey', '736db36f-7d1e-463c-bcec-15f9b1ca77f6'  );
    const options = {
      headers: headers
    };
    return this.http.get(url, options).pipe(map((res:any[]) => {
        res.forEach(element => {
        let immunization=new PatientImmunization()
        immunization.administratedBy=JsonQuery.value(element, JSON_PATHS.PATIENTIMMUNIZATION.ADMINISTRATEDBY) || '';
        immunization.userId=JsonQuery.value(element, JSON_PATHS.PATIENTIMMUNIZATION.USERID) || '';
        immunization.id=JsonQuery.value(element, JSON_PATHS.PATIENTIMMUNIZATION.ID) || '';
        immunization.date=moment(JsonQuery.value(element, JSON_PATHS.PATIENTIMMUNIZATION.DATE)).format('DD/MM/YYYY') || '';
        immunization.nextDate=moment(JsonQuery.value(element, JSON_PATHS.PATIENTIMMUNIZATION.NEXTDATE)).format('DD/MM/YYYY')  || '';
        immunization.vaccineId=JsonQuery.value(element, JSON_PATHS.PATIENTIMMUNIZATION.VACCINEID) || '';
       this.patientImmunization.push(immunization)
       });
      return res;
    }
      ), catchError(e => throwError(e)) );
  }
  
      /**
   * Fetch Patient conditions 
   */
  GetPatientConditions(userId?: string) {
    this.patientConditions=[]
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
    this.patientPressures=[]
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
        pressure.date=moment(JsonQuery.value(element, JSON_PATHS.PATIENTPRESSURE.DATE)).format('DD/MM') || '';
        pressure.diastolic=JsonQuery.value(element, JSON_PATHS.PATIENTPRESSURE.DIASTOLIC) || '';
        pressure.systolic=JsonQuery.value(element, JSON_PATHS.PATIENTPRESSURE.SYSTOLIC) || '';
       this.patientPressures.push(pressure)
       });
       
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
    this.patientCalculatedPressure=new PatientPressure();
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
  
}
  }
  GetPatientBodyInfo(userId?: string) {
    this.patientBody=new PatientBody();
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
   { let allergyRes=new PatientConditions()

    allergyRes.name=JsonQuery.value(res, JSON_PATHS.PATIENTALLERGIES.ALLERGYNAME) || '';
    allergyRes.userId=JsonQuery.value(res, JSON_PATHS.PATIENTALLERGIES.USERID) || '';
    allergyRes.id=JsonQuery.value(res, JSON_PATHS.PATIENTALLERGIES.ID) || '';
   this.patientAllergies.push(allergyRes)
  this.allergiesCount+=1
  return res;
  }
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

    conditionRes.name=JsonQuery.value(res, JSON_PATHS.PATIENTCONDITIONS.NAME) || '';
    conditionRes.userId=JsonQuery.value(res, JSON_PATHS.PATIENTCONDITIONS.USERID) || '';
    conditionRes.id=JsonQuery.value(res, JSON_PATHS.PATIENTCONDITIONS.ID) || '';
   this.patientConditions.push(conditionRes)
   this.conditionsCount+=1
   return res;
  }
  ))
  }
  GetPatientMedication(userId?: string) {
    this.patientMedication=[]
    let url = 'http://36765264api.medirec.me/api/medications/1';
    let headers = new HttpHeaders();
    headers = headers.append('MedKey', '736db36f-7d1e-463c-bcec-15f9b1ca77f6'  );
    const options = {
      headers: headers
    };
    return this.http.get(url, options).pipe(map((res:any[]) => {
      
      res.forEach(element => {
      let medication=new PatientConditions();
      medication.name=JsonQuery.value(element, JSON_PATHS.PATIENTMEDICATION.NAME) || '';
      medication.userId=JsonQuery.value(element, JSON_PATHS.PATIENTMEDICATION.USERID) || '';
      medication.id=JsonQuery.value(element, JSON_PATHS.PATIENTMEDICATION.ID) || '';
     this.patientMedication.push(medication)
     });

      return res;
    }
    ), catchError(e => throwError(e)) );
  }
  addMedication(medication){
    const url = 'http://36765264api.medirec.me/api/medications'
    let headers = new HttpHeaders();
    headers = headers.append('MedKey', '736db36f-7d1e-463c-bcec-15f9b1ca77f6'  );
    headers = headers.append('Content-Type', 'application/json');
    const options = {
      headers: headers
    };
    return this.http.post(url, medication, options).pipe(map((res) => 
   { let medicationRes=new PatientConditions()
    
    medicationRes.name=JsonQuery.value(res, JSON_PATHS.PATIENTMEDICATION.NAME) || '';
    medicationRes.userId=JsonQuery.value(res, JSON_PATHS.PATIENTMEDICATION.USERID) || '';
    medicationRes.id=JsonQuery.value(res,  JSON_PATHS.PATIENTMEDICATION.ID) || '';
   this.patientMedication.push(medicationRes)
   this.medicationCount+=1
   return res;}
  ))
  }
  GetPatientMedicalDevice(userId?: string) {
    this.patientMedicalDevice=[]
    let url = 'http://36765264api.medirec.me/api/MedicalDevices/1';
    let headers = new HttpHeaders();
    headers = headers.append('MedKey', '736db36f-7d1e-463c-bcec-15f9b1ca77f6'  );
    const options = {
      headers: headers
    };
    return this.http.get(url, options).pipe(map((res:any[]) => {
      
      res.forEach(element => {
      let medicalDevice=new PatientConditions();
      medicalDevice.name=JsonQuery.value(element, JSON_PATHS.PATIENTMEDICALDEVICE.NAME) || '';
      medicalDevice.userId=JsonQuery.value(element, JSON_PATHS.PATIENTMEDICALDEVICE.USERID) || '';
      medicalDevice.id=JsonQuery.value(element, JSON_PATHS.PATIENTMEDICALDEVICE.ID) || '';
     this.patientMedicalDevice.push(medicalDevice)
     });

      return res;
    }
    ), catchError(e => throwError(e)) );
  }
  addMedicalDevice(medical){
    const url = 'http://36765264api.medirec.me/api/MedicalDevices'
    let headers = new HttpHeaders();
    headers = headers.append('MedKey', '736db36f-7d1e-463c-bcec-15f9b1ca77f6'  );
    headers = headers.append('Content-Type', 'application/json');
    const options = {
      headers: headers
    };
    return this.http.post(url, medical, options).pipe(map((res) => 
   { let medicalDevice=new PatientConditions()
    
    medicalDevice.name=JsonQuery.value(res, JSON_PATHS.PATIENTMEDICALDEVICE.NAME) || '';
    medicalDevice.userId=JsonQuery.value(res, JSON_PATHS.PATIENTMEDICALDEVICE.USERID) || '';
    medicalDevice.id=JsonQuery.value(res, JSON_PATHS.PATIENTMEDICALDEVICE.ID) || '';
   this.patientMedicalDevice.push(medicalDevice)
   this.medicalDeviceCount+=1
   return res;
   }))
  }
  GetPatientContacts(userId?: string) {
    this.patientContacts=[]
    let url = 'http://36765264api.medirec.me/api/Contacts/1';
    let headers = new HttpHeaders();
    headers = headers.append('MedKey', '736db36f-7d1e-463c-bcec-15f9b1ca77f6'  );
    const options = {
      headers: headers
    };
    return this.http.get(url, options).pipe(map((res:any[]) => {
      
      res.forEach(element => {
        let patientContact=new PatientContacts();
        patientContact.fullName=JsonQuery.value(element, JSON_PATHS.PATIENTCONTACTS.FULLNAME) || '';
        patientContact.userId=JsonQuery.value(element, JSON_PATHS.PATIENTCONTACTS.USERID) || '';
        patientContact.id=JsonQuery.value(element, JSON_PATHS.PATIENTCONTACTS.ID) || '';
        patientContact.phoneNumber01=JsonQuery.value(element, JSON_PATHS.PATIENTCONTACTS.PHONENUMBER01) || '';
        patientContact.phoneNumber02=JsonQuery.value(element, JSON_PATHS.PATIENTCONTACTS.PHONENUMBER02) || '';
        patientContact.typeOfRelation=JsonQuery.value(element, JSON_PATHS.PATIENTCONTACTS.RELATION) || '';
        patientContact.email=JsonQuery.value(element, JSON_PATHS.PATIENTCONTACTS.EMAIL) || '';
       this.patientContacts.push(patientContact)
       });
     

      return res;
    }
    ), catchError(e => throwError(e)) );
  }

  GetAllResources(userId?: string) {

    let url = 'http://36765264api.medirec.me/api/GetResourcesCount/1';
    let headers = new HttpHeaders();
    headers = headers.append('MedKey', '736db36f-7d1e-463c-bcec-15f9b1ca77f6'  );
    const options = {
      headers: headers
    };
    return this.http.get(url, options).pipe(map((res:number) => {
      
      this.resourcesCount=res;
      

      return res;
    }
    ), catchError(e => throwError(e)) );
  }
  GetAllContacts(userId?: string) {

    let url = 'http://36765264api.medirec.me/api/GetContactsCount/1';
    let headers = new HttpHeaders();
    headers = headers.append('MedKey', '736db36f-7d1e-463c-bcec-15f9b1ca77f6'  );
    const options = {
      headers: headers
    };
    return this.http.get(url, options).pipe(map((res:number) => {
      
      this.contactsCount=res;
      

      return res;
    }
    ), catchError(e => throwError(e)) );
  }
  GetAllMedication(userId?: string) {

    let url = 'http://36765264api.medirec.me/api/GetMedicationsCount/1';
    let headers = new HttpHeaders();
    headers = headers.append('MedKey', '736db36f-7d1e-463c-bcec-15f9b1ca77f6'  );
    const options = {
      headers: headers
    };
    return this.http.get(url, options).pipe(map((res:number) => {
      
      this.medicationCount=res;
      

      return res;
    }
    ), catchError(e => throwError(e)) );
  }
  GetAllMedicalDevice(userId?: string) {

    let url = 'http://36765264api.medirec.me/api/GetMedicalDevicesCount/1';
    let headers = new HttpHeaders();
    headers = headers.append('MedKey', '736db36f-7d1e-463c-bcec-15f9b1ca77f6'  );
    const options = {
      headers: headers
    };
    return this.http.get(url, options).pipe(map((res:number) => {
      
      this.medicalDeviceCount=res;
      

      return res;
    }
    ), catchError(e => throwError(e)) );
  }
  GetAllHumanBody(userId?: string) {

    let url = 'http://36765264api.medirec.me/api/GetHumanBodyCount/1';
    let headers = new HttpHeaders();
    headers = headers.append('MedKey', '736db36f-7d1e-463c-bcec-15f9b1ca77f6'  );
    const options = {
      headers: headers
    };
    return this.http.get(url, options).pipe(map((res:number) => {
      
      this.humanBodiesCount=res;
      

      return res;
    }
    ), catchError(e => throwError(e)) );
  }
  GetAllCondition(userId?: string) {

    let url = 'http://36765264api.medirec.me/api/GetCondationsCount/1';
    let headers = new HttpHeaders();
    headers = headers.append('MedKey', '736db36f-7d1e-463c-bcec-15f9b1ca77f6'  );
    const options = {
      headers: headers
    };
    return this.http.get(url, options).pipe(map((res:number) => {
      
      this.conditionsCount=res;
      

      return res;
    }
    ), catchError(e => throwError(e)) );
  }
  GetAllBloodPressure(userId?: string) {

    let url = 'http://36765264api.medirec.me/api/GetBloodPressureCount/1';
    let headers = new HttpHeaders();
    headers = headers.append('MedKey', '736db36f-7d1e-463c-bcec-15f9b1ca77f6'  );
    const options = {
      headers: headers
    };
    return this.http.get(url, options).pipe(map((res:number) => {
      
      this.bloodPressureCount=res;
      

      return res;
    }
    ), catchError(e => throwError(e)) );
  }
  GetAllAllergies(userId?: string) {

    let url = 'http://36765264api.medirec.me/api/GetAllergiesCount/1';
    let headers = new HttpHeaders();
    headers = headers.append('MedKey', '736db36f-7d1e-463c-bcec-15f9b1ca77f6'  );
    const options = {
      headers: headers
    };
    return this.http.get(url, options).pipe(map((res:number) => {
      
      this.allergiesCount=res;
      

      return res;
    }
    ), catchError(e => throwError(e)) );
  }
  GetAllImmunization(userId?: string) {

    let url = 'http://36765264api.medirec.me/api/GetImmunizationsCount/1';
    let headers = new HttpHeaders();
    headers = headers.append('MedKey', '736db36f-7d1e-463c-bcec-15f9b1ca77f6'  );
    const options = {
      headers: headers
    };
    return this.http.get(url, options).pipe(map((res:number) => {
      
      this.immunizationsCount=res;
      

      return res;
    }
    ), catchError(e => throwError(e)) );
  }
  update(data:PatientConditions,type,userId?: string) {
    let headers = new HttpHeaders();
    headers = headers.append('MedKey', '736db36f-7d1e-463c-bcec-15f9b1ca77f6'  );
    const options = {
      headers: headers
    };
    let url
    if(type==='allergy'){
      url = `http://36765264api.medirec.me/api/Allergies/${data.id}`;
 let allergy={
  allergiesId:data.id,
  userId:data.userId,
  name:data.name
 }
     return this.http.put(url, allergy,options).pipe(map((res) => {
       
       let allergy=this.patientAllergies.find(el=>el.id===data.id)
       let allergyAll=this.patientAllergiesDetails.find(el=>el.id===data.id)
       allergyAll.name=JsonQuery.value(res, JSON_PATHS.PATIENTALLERGIES.ALLERGYNAME) || '';
       if(allergy){
       allergy.name=JsonQuery.value(res, JSON_PATHS.PATIENTALLERGIES.ALLERGYNAME) || '';
   
       }
       return res;
     }
     ), catchError(e => throwError(e)) );
    }
    if(type==='condition'){
      url = `http://36765264api.medirec.me/api/Condations/${data.id}`;
      let condition={
        condationsId:data.id,
        userId:data.userId,
        name:data.name
       }
      return this.http.put(url, condition,options).pipe(map((res) => {
        
        let condition=this.patientConditions.find(el=>el.id===data.id)
        let conditionAll=this.patientConditionsDetails.find(el=>el.id===data.id)
        conditionAll.name=JsonQuery.value(res, JSON_PATHS.PATIENTCONDITIONS.NAME) || '';
        if(condition){
        condition.name=JsonQuery.value(res, JSON_PATHS.PATIENTCONDITIONS.NAME) || '';
  
        }
        return res;
      }
      ), catchError(e => throwError(e)) );
    }
    if(type==='medication'){
      url = `http://36765264api.medirec.me/api/medications/${data.id}`;
      let medication={
        medicationsId:data.id,
        userId:data.userId,
        name:data.name
       }
      return this.http.put(url, medication,options).pipe(map((res) => {
        
        let medication=this.patientMedication.find(el=>el.id===data.id)
        let medicationAll=this.patientMedicationDetails.find(el=>el.id===data.id)
        medicationAll.name=JsonQuery.value(res, JSON_PATHS.PATIENTMEDICATION.NAME) || '';
        if(medication){
          medication.name=JsonQuery.value(res, JSON_PATHS.PATIENTMEDICATION.NAME) || '';
  
        }
        return res;
      }
      ), catchError(e => throwError(e)) );
    }
    if(type==='device'){
      url = `http://36765264api.medirec.me/api/MedicalDevices/${data.id}`;
      let device={
        medicalDevicesId:data.id,
        userId:data.userId,
        name:data.name
       }
      return this.http.put(url, device,options).pipe(map((res) => {
        
        let device=this.patientMedicalDevice.find(el=>el.id===data.id)
        let deviceAll=this.patientMedicalDeviceDetails.find(el=>el.id===data.id)
        deviceAll.name=JsonQuery.value(res, JSON_PATHS.PATIENTMEDICALDEVICE.NAME) || '';
        if(device){
        device.name=JsonQuery.value(res, JSON_PATHS.PATIENTMEDICALDEVICE.NAME) || '';
  
        }
        return res;
      }
      ), catchError(e => throwError(e)) );
    }

   
  }
  getAllData(type){
    this.patientAllergiesDetails=[]
    this.patientConditionsDetails=[]
    this.patientContactsDetails=[]
    this.patientMedicalDeviceDetails=[]
    this.patientMedicalDeviceDetails=[]
    this.patientMedicationDetails=[]
    this.patientPressuresDetails=[]
    if(type==='allergy'){
      let url = 'http://36765264api.medirec.me/api/GetAllergiesDetails/1'
      let headers = new HttpHeaders();
      headers = headers.append('MedKey', '736db36f-7d1e-463c-bcec-15f9b1ca77f6'  );
      const options = {
        headers: headers
      };
      return this.http.get(url, options).pipe(map((res:any[]) => {
        res.forEach(element => {
        let allergy=new PatientConditions()
        allergy.name=JsonQuery.value(element, JSON_PATHS.PATIENTALLERGIES.ALLERGYNAME) || '';
        allergy.userId=JsonQuery.value(element, JSON_PATHS.PATIENTALLERGIES.USERID) || '';
        allergy.id=JsonQuery.value(element, JSON_PATHS.PATIENTALLERGIES.ID) || '';
       this.patientAllergiesDetails.push(allergy)
       });
       
  
  
  
        
        return res;
      }
      ), catchError(e => throwError(e)) );
    }
    if(type==='condition'){
      let url = 'http://36765264api.medirec.me/api/GetCondationsDetails/1'
      let headers = new HttpHeaders();
      headers = headers.append('MedKey', '736db36f-7d1e-463c-bcec-15f9b1ca77f6'  );
      const options = {
        headers: headers
      };
      return this.http.get(url, options).pipe(map((res:any[]) => {
        res.forEach(element => {
        let condition=new PatientConditions()
        condition.name=JsonQuery.value(element, JSON_PATHS.PATIENTCONDITIONS.NAME) || '';
        condition.userId=JsonQuery.value(element, JSON_PATHS.PATIENTCONDITIONS.USERID) || '';
        condition.id=JsonQuery.value(element, JSON_PATHS.PATIENTCONDITIONS.ID) || '';
       this.patientConditionsDetails.push(condition)
       });
       
  
  
  
        
        return res;
      }
      ), catchError(e => throwError(e)) );
    }
    if(type==='medication'){
      let url = 'http://36765264api.medirec.me/api/GetMedicationsDetails/1'
      let headers = new HttpHeaders();
      headers = headers.append('MedKey', '736db36f-7d1e-463c-bcec-15f9b1ca77f6'  );
      const options = {
        headers: headers
      };
      return this.http.get(url, options).pipe(map((res:any[]) => {
        res.forEach(element => {
        let medication=new PatientConditions()
        medication.name=JsonQuery.value(element, JSON_PATHS.PATIENTMEDICATION.NAME) || '';
        medication.userId=JsonQuery.value(element, JSON_PATHS.PATIENTMEDICATION.USERID) || '';
        medication.id=JsonQuery.value(element, JSON_PATHS.PATIENTMEDICATION.ID) || '';
       this.patientMedicationDetails.push(medication)
       });
       
  
  
  
        
        return res;
      }
      ), catchError(e => throwError(e)) );
    }
    if(type==='device'){
      let url = 'http://36765264api.medirec.me/api/GetMedicalDevicesDetails/1'
      let headers = new HttpHeaders();
      headers = headers.append('MedKey', '736db36f-7d1e-463c-bcec-15f9b1ca77f6'  );
      const options = {
        headers: headers
      };
      return this.http.get(url, options).pipe(map((res:any[]) => {
        res.forEach(element => {
        let device=new PatientConditions()
        device.name=JsonQuery.value(element, JSON_PATHS.PATIENTMEDICALDEVICE.NAME) || '';
        device.userId=JsonQuery.value(element, JSON_PATHS.PATIENTMEDICALDEVICE.USERID) || '';
        device.id=JsonQuery.value(element, JSON_PATHS.PATIENTMEDICALDEVICE.ID) || '';
       this.patientMedicalDeviceDetails.push(device)
       });
       
  
  
  
        
        return res;
      }
      ), catchError(e => throwError(e)) );
    }
  }
  DeleteData(type,data){
  
    if(type==='allergy'){
      let url = `http://36765264api.medirec.me/api/Allergies/${data.id}`
      let headers = new HttpHeaders();
      headers = headers.append('MedKey', '736db36f-7d1e-463c-bcec-15f9b1ca77f6'  );
      const options = {
        headers: headers
      };
      return this.http.delete(url,options).pipe(map((res) => {
       const index= this.patientAllergiesDetails.findIndex(el=>el.id==data.id);
    this.patientAllergiesDetails.splice(index,1)
    this.patientAllergies.splice(index,1)
    this.allergiesCount=this.patientAllergiesDetails.length
    return res
      }
      ), catchError(e => throwError(e)) );
    }
    if(type==='condition'){
      let url = `http://36765264api.medirec.me/api/Condations/${data.id}`
      let headers = new HttpHeaders();
      headers = headers.append('MedKey', '736db36f-7d1e-463c-bcec-15f9b1ca77f6'  );
      const options = {
        headers: headers
      };
      return this.http.delete(url, options).pipe(map((res) => {
        const index= this.patientConditionsDetails.findIndex(el=>el.id==data.id);
        this.patientConditionsDetails.splice(index,1)
        this.patientConditions.splice(index,1)
        this.conditionsCount= this.patientConditionsDetails.length
        return res;
      }
      ), catchError(e => throwError(e)) );
    }
    if(type==='medication'){
      let url = `http://36765264api.medirec.me/api/medications/${data.id}`;
      let headers = new HttpHeaders();
      headers = headers.append('MedKey', '736db36f-7d1e-463c-bcec-15f9b1ca77f6'  );
      const options = {
        headers: headers
      };
      return this.http.get(url, options).pipe(map((res) => {
        const index= this.patientMedicationDetails.findIndex(el=>el.id==data.id);
        this.patientMedicationDetails.splice(index,1)
        this.patientMedication.splice(index,1)
        this.medicationCount= this.patientMedicationDetails.length
        return res;
      }
      ), catchError(e => throwError(e)) );
    }
    if(type==='device'){
      let url = `http://36765264api.medirec.me/api/MedicalDevices/${data.id}`;
      let headers = new HttpHeaders();
      headers = headers.append('MedKey', '736db36f-7d1e-463c-bcec-15f9b1ca77f6'  );
      const options = {
        headers: headers
      };
      return this.http.delete(url, options).pipe(map((res) => {
        const index= this.patientMedicalDeviceDetails.findIndex(el=>el.id==data.id);
        this.patientMedicalDeviceDetails.splice(index,1)
        this.patientMedicalDevice.splice(index,1)
        this.medicalDeviceCount= this.patientMedicalDeviceDetails.length
        return res;
      }
      ), catchError(e => throwError(e)) );
    }
  }
  editContact(contact){
    const url = `http://36765264api.medirec.me/api/Contacts/${contact.id}`
    let headers = new HttpHeaders();
    headers = headers.append('MedKey', '736db36f-7d1e-463c-bcec-15f9b1ca77f6'  );
    headers = headers.append('Content-Type', 'application/json');
    const options = {
      headers: headers
    };
    return this.http.put(url, contact, options).pipe(map((res) => 
   {
     let patientContactAll=this.patientContactsDetails.find(el=>el.id===contact.id)
     let patientContact=this.patientContacts.find(el=>el.id===contact.id)
     patientContactAll.fullName=JsonQuery.value(res, JSON_PATHS.PATIENTCONTACTS.FULLNAME) || '';
     patientContactAll.userId=JsonQuery.value(res, JSON_PATHS.PATIENTCONTACTS.USERID) || '';
     patientContactAll.id=JsonQuery.value(res, JSON_PATHS.PATIENTCONTACTS.ID) || '';
     patientContactAll.phoneNumber01=JsonQuery.value(res, JSON_PATHS.PATIENTCONTACTS.PHONENUMBER01) || '';
     patientContactAll.phoneNumber02=JsonQuery.value(res, JSON_PATHS.PATIENTCONTACTS.PHONENUMBER02) || '';
     patientContactAll.typeOfRelation=JsonQuery.value(res, JSON_PATHS.PATIENTCONTACTS.RELATION) || '';
     patientContactAll.email=JsonQuery.value(res, JSON_PATHS.PATIENTCONTACTS.EMAIL) || '';
     if(patientContact){
      patientContact.fullName=JsonQuery.value(res, JSON_PATHS.PATIENTCONTACTS.FULLNAME) || '';
      patientContact.userId=JsonQuery.value(res, JSON_PATHS.PATIENTCONTACTS.USERID) || '';
      patientContact.id=JsonQuery.value(res, JSON_PATHS.PATIENTCONTACTS.ID) || '';
      patientContact.phoneNumber01=JsonQuery.value(res, JSON_PATHS.PATIENTCONTACTS.PHONENUMBER01) || '';
      patientContact.phoneNumber02=JsonQuery.value(res, JSON_PATHS.PATIENTCONTACTS.PHONENUMBER02) || '';
      patientContact.typeOfRelation=JsonQuery.value(res, JSON_PATHS.PATIENTCONTACTS.RELATION) || '';
      patientContact.email=JsonQuery.value(res, JSON_PATHS.PATIENTCONTACTS.EMAIL) || '';
     }
    
   
   }))
  }
  addContact(contact){
    const url = `http://36765264api.medirec.me/api/Contacts/1`
    let headers = new HttpHeaders();
    headers = headers.append('MedKey', '736db36f-7d1e-463c-bcec-15f9b1ca77f6'  );
    headers = headers.append('Content-Type', 'application/json');
    const options = {
      headers: headers
    };
    return this.http.post(url, contact, options).pipe(map((res) => 
   {
    
     let patientContact=new PatientContacts()
    

      patientContact.fullName=JsonQuery.value(res, JSON_PATHS.PATIENTCONTACTS.FULLNAME) || '';
      patientContact.userId=JsonQuery.value(res, JSON_PATHS.PATIENTCONTACTS.USERID) || '';
      patientContact.id=JsonQuery.value(res, JSON_PATHS.PATIENTCONTACTS.ID) || '';
      patientContact.phoneNumber01=JsonQuery.value(res, JSON_PATHS.PATIENTCONTACTS.PHONENUMBER01) || '';
      patientContact.phoneNumber02=JsonQuery.value(res, JSON_PATHS.PATIENTCONTACTS.PHONENUMBER02) || '';
      patientContact.typeOfRelation=JsonQuery.value(res, JSON_PATHS.PATIENTCONTACTS.RELATION) || '';
      patientContact.email=JsonQuery.value(res, JSON_PATHS.PATIENTCONTACTS.EMAIL) || '';
      this.patientContacts.push(patientContact)
     this.contactsCount+=1;
     return res;
   
   }))
  }
}
