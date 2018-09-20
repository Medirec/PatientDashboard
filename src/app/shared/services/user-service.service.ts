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
import { MyRecordsService } from '../../my-records/my-records.service';
import { PatientVaccines } from '../model/patient-vaccines.model';
import { City } from '../model/cities.model';
import { Area } from '../model/area.model';

@Injectable({
  providedIn: 'root'
})
export class UserService{

patientDetails:PatientDetails;
patientMoreDetails:PatientDetails;
patientBody:PatientBody
vaccines:PatientVaccines[]=[]
cities:City[]=[]
area:Area[]=[]
patientBodies:PatientBody[]=[]
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
patientImmunizations:PatientImmunization[]=[];
patientCalculatedPressure:PatientPressure=new PatientPressure();
resourcesCount:number=0;
medicalDeviceCount:number=0;
medicationCount:number=0;
humanBodiesCount:number=0;
allergiesCount:number=0;
conditionsCount:number=0;
bloodPressureCount:number=0;
immunizationsCount:number=0;
contactsCount:number=0;
diastolic:number[]=[];
systolic:number[]=[];
date:any[]=[];
  constructor(private http: HttpClient,private myRecordsService:MyRecordsService) {

   }
    /**
   * Fetch Patient details 
   */
  GetPatientDetails(userId?: string) {
    this.patientDetails=new PatientDetails();
    let url = 'http://36765264api.medirec.me/api/GetPatientsDetails/6'
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
        this.patientDetails.phoneNumber=JsonQuery.value(res[0], JSON_PATHS.PATIENTDETAILS.PHONENUMBER) || '';
        if(JsonQuery.value(res[0], JSON_PATHS.PATIENTDETAILS.GENDER)){
          this.patientDetails.gender=JsonQuery.value(res[0], JSON_PATHS.PATIENTDETAILS.GENDER).toLowerCase()==='m'?Gender.Male:Gender.Female;
  
        }
      }
      return res;
    }
    ), catchError(e => throwError(e)) );
  }
  GetPatientMoreDetails(userId?: string) {
    this.patientDetails=new PatientDetails();
    let url = 'http://36765264api.medirec.me/api/patients/6'
    let headers = new HttpHeaders();
    headers = headers.append('MedKey', '736db36f-7d1e-463c-bcec-15f9b1ca77f6'  );
    const options = {
      headers: headers
    };
    this.patientMoreDetails=new PatientDetails();
    return this.http.get(url, options).pipe(map((res) => {
      if(res){
        this.patientMoreDetails.fullName=JsonQuery.value(res, JSON_PATHS.PATIENTDETAILS.FULLNAME) || '';
        this.patientMoreDetails.city=this.patientDetails.city
        this.patientMoreDetails.areaName=this.patientDetails.areaName
        this.patientMoreDetails.address=JsonQuery.value(res, JSON_PATHS.PATIENTDETAILS.ADDRESS) || '';
        this.patientMoreDetails.phoneNumber=JsonQuery.value(res, JSON_PATHS.PATIENTDETAILS.PHONENUMBER) || '';
        this.patientMoreDetails.cityId=JsonQuery.value(res, JSON_PATHS.PATIENTDETAILS.CITYID) || '';
        this.patientMoreDetails.countryId=JsonQuery.value(res, JSON_PATHS.PATIENTDETAILS.COUNTRYID) || '';
        this.patientMoreDetails.areaId=JsonQuery.value(res, JSON_PATHS.PATIENTDETAILS.AREAID) || '';
        this.patientMoreDetails.birthDate=moment(JsonQuery.value(res, JSON_PATHS.PATIENTDETAILS.BIRTHDATE)).format('DD/MM/YYYY') || '';
        if(JsonQuery.value(res, JSON_PATHS.PATIENTDETAILS.GENDER)){
          this.patientMoreDetails.gender=JsonQuery.value(res, JSON_PATHS.PATIENTDETAILS.GENDER).toLowerCase()==='m'?Gender.Male:Gender.Female;
  
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
        immunization.vaccineName=JsonQuery.value(element, JSON_PATHS.PATIENTIMMUNIZATION.VACCINENAME) || '';
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
    this.patientPressuresDetails=[]
    this.date=[]
    let url = 'http://36765264api.medirec.me/api/GetBloodPressureDetails/1';
    let headers = new HttpHeaders();
    headers = headers.append('MedKey', '736db36f-7d1e-463c-bcec-15f9b1ca77f6'  );
    const options = {
      headers: headers
    };
    return this.http.get(url, options).pipe(map((res:any[]) => {
      
      res.forEach(element => {
        let pressureDetails=new PatientPressure()
        pressureDetails.id=JsonQuery.value(element, JSON_PATHS.PATIENTPRESSURE.ID) || '';
        pressureDetails.userId=JsonQuery.value(element, JSON_PATHS.PATIENTPRESSURE.USERID) || '';
        pressureDetails.date=moment(JsonQuery.value(element, JSON_PATHS.PATIENTPRESSURE.DATE)).format('DD/MM/YYYY') || '';
        pressureDetails.diastolic=JsonQuery.value(element, JSON_PATHS.PATIENTPRESSURE.DIASTOLIC) || '';
        pressureDetails.systolic=JsonQuery.value(element, JSON_PATHS.PATIENTPRESSURE.SYSTOLIC) || '';
        this.patientPressuresDetails.push(pressureDetails)
       let pressure=this.patientPressures.find(el=>el.date===moment(JsonQuery.value(element, JSON_PATHS.PATIENTPRESSURE.DATE)).format('DD/MM/YYYY'))
        if(pressure){
          pressure.diastolic=((+pressure.diastolic+JsonQuery.value(element, JSON_PATHS.PATIENTPRESSURE.DIASTOLIC)) /2)+""
          pressure.systolic=((+pressure.systolic+JsonQuery.value(element, JSON_PATHS.PATIENTPRESSURE.SYSTOLIC)) /2)+""
        }
        else{
          pressure=new PatientPressure();
          pressure.id=JsonQuery.value(element, JSON_PATHS.PATIENTPRESSURE.ID) || '';
          pressure.userId=JsonQuery.value(element, JSON_PATHS.PATIENTPRESSURE.USERID) || '';
          pressure.date=moment(JsonQuery.value(element, JSON_PATHS.PATIENTPRESSURE.DATE)).format('DD/MM/YYYY') || '';
          pressure.diastolic=JsonQuery.value(element, JSON_PATHS.PATIENTPRESSURE.DIASTOLIC) || '';
          pressure.systolic=JsonQuery.value(element, JSON_PATHS.PATIENTPRESSURE.SYSTOLIC) || '';
         
          this.date.push(pressure.date)
          this.patientPressures.push(pressure)
        }
       
    
       
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
    this.systolic=[]
    this.diastolic=[]
if(this.patientPressures.length){
  let systolicSUM=0;
  let diastolicSUM=0;
  this.patientPressures.map(el=>{
systolicSUM+=+el.systolic
diastolicSUM+=+el.diastolic
this.systolic.push( +el.systolic)
 
this.diastolic.push( +el.diastolic)
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
        this.patientBody.date=moment(JsonQuery.value(res, JSON_PATHS.PATIENTBODY.DATE)).format("MM/DD/YYYY") || '';
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
   this.patientAllergiesDetails.push(allergyRes)
this.myRecordsService.dataSet=this.patientAllergiesDetails
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
   this.patientConditionsDetails.push(conditionRes)
this.myRecordsService.dataSet=this.patientConditionsDetails

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
   this.patientMedicationDetails.push(medicationRes)
this.myRecordsService.dataSet=this.patientMedicationDetails

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
   this.patientMedicalDeviceDetails.push(medicalDevice)
   this.myRecordsService.dataSet=this.patientMedicalDeviceDetails
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
      
      this.resourcesCount=res||0;
      

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
      
      this.contactsCount=res||0;
      

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
      
      this.medicationCount=res||0;
      

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
      
      this.medicalDeviceCount=res||0;
      

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
      
      this.humanBodiesCount=res||0;
      

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
      
      this.conditionsCount=res||0;
      

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
      
      this.bloodPressureCount=res||0;
      

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
      
      this.allergiesCount=res||0;
      

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
      
      this.immunizationsCount=res||0;
      

      return res;
    }
    ), catchError(e => throwError(e)) );
  }
  update(data,type,userId?: string) {
    let headers = new HttpHeaders();
    headers = headers.append('MedKey', '736db36f-7d1e-463c-bcec-15f9b1ca77f6'  );
    headers =  headers.append('Content-Type', 'application/json');
    const options = {
      headers: headers,
      responseType: 'text'
    };
    let url
    if(type==='allergy'){
      url = `http://36765264api.medirec.me/api/Allergies/${data.id}`;
 let allergy={
  allergiesId:data.id,
  userId:data.userId,
  name:data.name
 }
     return this.http.put(url, allergy,{
      headers: headers,
      responseType: 'text'
    }).pipe(map((res) => {
       
       let allergy=this.patientAllergies.find(el=>el.id===data.id)
       let allergyAll=this.patientAllergiesDetails.find(el=>el.id===data.id)
       allergyAll.name=data.name || '';
       if(allergy){
       allergy.name=data.name;
   
       }
      this.myRecordsService.dataSet=this.patientAllergiesDetails

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
      return this.http.put(url, condition,{
        headers: headers,
        responseType: 'text'
      }).pipe(map((res) => {
        
        let condition=this.patientConditions.find(el=>el.id===data.id)
        let conditionAll=this.patientConditionsDetails.find(el=>el.id===data.id)
        conditionAll.name=data.name
        if(condition){
        condition.name=data.name;
  
        }
      this.myRecordsService.dataSet=this.patientConditionsDetails

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
      return this.http.put(url, medication,{
        headers: headers,
        responseType: 'text'
      }).pipe(map((res) => {
        
        let medication=this.patientMedication.find(el=>el.id===data.id)
        let medicationAll=this.patientMedicationDetails.find(el=>el.id===data.id)
        medicationAll.name=data.name || '';
        if(medication){
          medication.name=data.name;
  
        }
      this.myRecordsService.dataSet=this.patientMedicationDetails

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
      return this.http.put(url, device,{
        headers: headers,
        responseType: 'text'
      }).pipe(map((res) => {
        
        let device=this.patientMedicalDevice.find(el=>el.id===data.id)
        let deviceAll=this.patientMedicalDeviceDetails.find(el=>el.id===data.id)
        deviceAll.name=data.name
        if(device){
        device.name=data.name;
  
        }
      this.myRecordsService.dataSet=this.patientMedicalDeviceDetails

        return res;
      }
      ), catchError(e => throwError(e)) );
    }

    if(type==='body'){
      url = `http://36765264api.medirec.me/api/HumanBodies/${data.id}`;
      let body={
        humanBodyId:data.id,
        userId:data.userId,
        date:new Date(data.date),
        height:data.height,
        weight:data.weight,
       }
      return this.http.put(url, body,{
        headers: headers,
        responseType: 'text'
      }).pipe(map((res) => {
        
        let human=this.patientBodies.find(el=>el.id===data.id)
        let date=moment(data.date, "MM/DD/YYYY").subtract(1,'day').format("DD/MM/YYYY")
        human.weight=data.weight
        human.height=data.height
        human.date=date
      this.myRecordsService.bodySet=this.patientBodies
        return res;
      }
      ), catchError(e => throwError(e)) );
    }
    if(type==='immunization'){
      url = `http://36765264api.medirec.me/api/Immunizations/${data.id}`;
      let body={
        immunizationId:data.id,
        userId:1,
        administratedBy:data.administratedBy,
        dateGiven:new Date(data.date),
        nextDoesDate:new Date(data.nextDate),
        vaccineId:data.vaccineId,
        vaccineName:data.vaccineName,
       }
      return this.http.put(url, body,{
        headers: headers,
        responseType: 'text'
      }).pipe(map((res) => {
        
        let immunization=this.patientImmunization.find(el=>el.id===data.id)
        let immunizationAll=this.patientImmunizations.find(el=>el.id===data.id)
       
        immunizationAll.administratedBy=data.administratedBy
        immunizationAll.date=moment(data.date, "MM/DD/YYYY").subtract(1,'day').format("DD/MM/YYYY")
        immunizationAll.nextDate=moment(data.nextDate, "MM/DD/YYYY").subtract(1,'day').format("DD/MM/YYYY")
        immunizationAll.vaccineId=data.vaccineId
        immunizationAll.vaccineName=data.vaccineName
        immunizationAll.id=data.id
        immunizationAll.userId=data.userId
        if(immunization){
           immunization.administratedBy=data.administratedBy
        immunization.date=moment(data.date, "MM/DD/YYYY").subtract(1,'day').format("DD/MM/YYYY")
        immunization.nextDate=moment(data.nextDate, "MM/DD/YYYY").subtract(1,'day').format("DD/MM/YYYY")
        immunization.vaccineId=data.vaccineId
        immunization.vaccineName=data.vaccineName
        immunization.id=data.id
        immunization.userId=data.userId
        }
        this.myRecordsService.immunizationtSet=this.patientImmunizations
      
        return res;
      }
      ), catchError(e => throwError(e)) );
    }
        if(type==='pressure'){
      url = `http://36765264api.medirec.me/api/BloodPressure/${data.id}`;
      let body={
        bloodPressureId:data.id,
        userId:data.userId,
        date:new Date(data.date),
        diastolic:data.diastolic,
        systolic:data.systolic,
       }
      return this.http.put(url, body,{
        headers: headers,
        responseType: 'text'
      }).pipe(map((res) => {
        
        let pressure=this.patientPressuresDetails.find(el=>el.id===data.id)
        let date=moment(data.date, "MM/DD/YYYY").subtract(1,'day').format("DD/MM/YYYY")
        pressure.systolic=data.systolic
        pressure.diastolic=data.diastolic
        pressure.date=date
      this.myRecordsService.pressureSet=this.patientPressuresDetails
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
    this.patientImmunizations=[]
    this.patientBodies=[]
    this.myRecordsService.bodySet=[]
    this.myRecordsService.immunizationtSet=[]
    this.myRecordsService.dataSet=[]
    this.myRecordsService.pressureSet=[]
    this.myRecordsService.contactSet=[]
    if(type==='immunization'){
      let url = 'http://36765264api.medirec.me/api/GetImmunizationsDetails/1'
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
        immunization.vaccineName=JsonQuery.value(element, JSON_PATHS.PATIENTIMMUNIZATION.VACCINENAME) || '';
       this.patientImmunizations.push(immunization)
       });
      return res;
    }
      ), catchError(e => throwError(e)) );
    }
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
    if(type==='contact'){
      let url = 'http://36765264api.medirec.me/api/GetContactsDetails/1';
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
         this.patientContactsDetails.push(patientContact)
         });
       
  
        return res;
      }
      ), catchError(e => throwError(e)) );
    }
    if(type==='body'){
      let url = 'http://36765264api.medirec.me/api/GetHumanBodyDetails/1';
      let headers = new HttpHeaders();
      headers = headers.append('MedKey', '736db36f-7d1e-463c-bcec-15f9b1ca77f6'  );
      const options = {
        headers: headers
      };
      return this.http.get(url, options).pipe(map((res:any[]) => {
        
        res.forEach(element => {
          let patientBody=new PatientBody();
          patientBody.id=JsonQuery.value(element, JSON_PATHS.PATIENTBODY.ID) || '';
    patientBody.userId=JsonQuery.value(element, JSON_PATHS.PATIENTBODY.USERID) || '';
     patientBody.weight=JsonQuery.value(element, JSON_PATHS.PATIENTBODY.WEIGHT) || '';
     patientBody.height=JsonQuery.value(element, JSON_PATHS.PATIENTBODY.HEIGHT) || '';
     patientBody.date=moment(JsonQuery.value(element, JSON_PATHS.PATIENTBODY.DATE)).format("DD/MM/YYYY") || '';

    
      this.patientBodies.push(patientBody)
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
    this.myRecordsService.dataSet=this.patientAllergiesDetails

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
    this.myRecordsService.dataSet=this.patientConditionsDetails

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
      return this.http.delete(url, options).pipe(map((res) => {
        const index= this.patientMedicationDetails.findIndex(el=>el.id==data.id);
        this.patientMedicationDetails.splice(index,1)
        this.patientMedication.splice(index,1)
        this.medicationCount= this.patientMedicationDetails.length
    this.myRecordsService.dataSet=this.patientMedicationDetails

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
    this.myRecordsService.dataSet=this.patientMedicalDeviceDetails

        return res;
      }
      ), catchError(e => throwError(e)) );
    }
    if(type==='contact'){
      let url = `http://36765264api.medirec.me/api/Contacts/${data.id}`;
      let headers = new HttpHeaders();
      headers = headers.append('MedKey', '736db36f-7d1e-463c-bcec-15f9b1ca77f6'  );
      const options = {
        headers: headers
      };
      return this.http.delete(url, options).pipe(map((res) => {
        const index= this.patientContactsDetails.findIndex(el=>el.id==data.id);
        this.patientContactsDetails.splice(index,1)
        this.patientContacts.splice(index,1)
        this.contactsCount= this.patientContactsDetails.length
    this.myRecordsService.contactSet=this.patientContactsDetails

        return res;
      }
      ), catchError(e => throwError(e)) );
    }
    if(type==='body'){
      let url = `http://36765264api.medirec.me/api/HumanBodies/${data.id}`;
      let headers = new HttpHeaders();
      headers = headers.append('MedKey', '736db36f-7d1e-463c-bcec-15f9b1ca77f6'  );
      const options = {
        headers: headers
      };
      return this.http.delete(url, options).pipe(map((res) => {
        const index= this.patientBodies.findIndex(el=>el.id==data.id);
        this.patientBodies.splice(index,1)
        this.humanBodiesCount= this.patientBodies.length
        this.myRecordsService.bodySet=this.patientBodies
        return res;
      }
      ), catchError(e => throwError(e)) );
    }
    if(type==='immunization'){
      let url = `http://36765264api.medirec.me/api/Immunizations/${data.id}`;
      let headers = new HttpHeaders();
      headers = headers.append('MedKey', '736db36f-7d1e-463c-bcec-15f9b1ca77f6'  );
      const options = {
        headers: headers
      };
      return this.http.delete(url, options).pipe(map((res) => {
        const index= this.patientImmunization.findIndex(el=>el.id==data.id);
        this.patientImmunization.splice(index,1)
        this.patientImmunizations.splice(index,1)
        this.immunizationsCount= this.patientImmunizations.length
        this.myRecordsService.immunizationtSet=this.patientImmunizations

        return res;
      }
      ), catchError(e => throwError(e)) );
    }
    if(type==='pressure'){
      let url = `http://36765264api.medirec.me/api/BloodPressure/${data.id}`;
      let headers = new HttpHeaders();
      headers = headers.append('MedKey', '736db36f-7d1e-463c-bcec-15f9b1ca77f6'  );
      const options = {
        headers: headers
      };
      return this.http.delete(url, options).pipe(map((res) => {
        const index= this.patientPressures.findIndex(el=>el.id==data.id);
        const _index= this.patientPressuresDetails.findIndex(el=>el.id==data.id);
        this.patientPressures.splice(index,1)
        this.patientPressuresDetails.splice(_index,1)
        this.bloodPressureCount= this.patientPressures.length
        this.myRecordsService.pressureSet=this.patientPressuresDetails

        return res;
      }
      ), catchError(e => throwError(e)) );
    }
  }
  editContact(contact:PatientContacts){
    const url = `http://36765264api.medirec.me/api/Contacts/${contact.id}`
    let headers = new HttpHeaders();
    headers = headers.append('MedKey', '736db36f-7d1e-463c-bcec-15f9b1ca77f6'  );
    headers = headers.append('Content-Type', 'application/json');
    const options = {
      headers: headers,
      responseType: 'text'
    };
    let contactData={
      contactId:contact.id,
      email:contact.email,
      userId:contact.userId,
      fullName:contact.fullName,
      phoneNumber01:contact.phoneNumber01,
      phoneNumber02:contact.phoneNumber02,
      typeOfRelation:contact.typeOfRelation,
    }
    
    return this.http.put(url, contactData, {
      headers: headers,
      responseType: 'text'
    }).pipe(map((res) => 
   {
     let patientContactAll=this.patientContactsDetails.find(el=>el.id===contact.id)
     let patientContact=this.patientContacts.find(el=>el.id===contact.id)
     patientContactAll.fullName=contact.fullName
     patientContactAll.phoneNumber01=contact.phoneNumber01
     patientContactAll.phoneNumber02=contact.phoneNumber02
     patientContactAll.typeOfRelation=contact.typeOfRelation
     patientContactAll.email=contact.email
     if(patientContact){
      patientContact.fullName=contact.fullName
      patientContact.phoneNumber01=contact.phoneNumber01
      patientContact.phoneNumber02=contact.phoneNumber02
      patientContact.typeOfRelation=contact.typeOfRelation
      patientContact.email=contact.email
     }
     this.myRecordsService.contactSet=this.patientContactsDetails
    
   
   }))
  }
  addContact(contact){
    const url = `http://36765264api.medirec.me/api/Contacts`
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
      this.patientContactsDetails.push(patientContact)
     this.contactsCount+=1;
     this.myRecordsService.contactSet=this.patientContactsDetails

     return res;
   
   }))
  }
  editPatient(patient:PatientDetails){
    const url = `http://36765264api.medirec.me/api/patients/6`
    let headers = new HttpHeaders();
    headers = headers.append('MedKey', '736db36f-7d1e-463c-bcec-15f9b1ca77f6'  );
    headers = headers.append('Content-Type', 'application/json');
    const options = {
      headers: headers,
      responseType: 'text'
    };
    
    let patientData={
      "PatientId":6,
      "userId": 6,
      "fullName": patient.fullName,
      "insuranceId": 1,
"cityId": patient.cityId,
"areaId": patient.areaId,
"phoneNumber": patient.phoneNumber,
"gender": patient.gender==='Male'?'m':'f',
"address":patient.address,
"imageURL":patient.imageUrl,
"birthDate":new Date(patient.birthDate),
    }
    
    return this.http.put(url, patientData, {
      headers: headers,
      responseType: 'text'
    }).pipe(map((res) => 
   {
    this.patientDetails.age=patient.age
    this.patientDetails.fullName=patient.fullName
    this.patientDetails.areaName=patient.areaName
    this.patientDetails.city=patient.city
    this.patientDetails.imageUrl=patient.imageUrl
    this.patientDetails.patienCode=patient.patienCode
    this.patientDetails.phoneNumber=patient.phoneNumber
   return res
   }))
  }
  addBody(body){
    const url = `http://36765264api.medirec.me/api/HumanBodies`
    let headers = new HttpHeaders();
    headers = headers.append('MedKey', '736db36f-7d1e-463c-bcec-15f9b1ca77f6'  );
    headers = headers.append('Content-Type', 'application/json');
    const options = {
      headers: headers
    };
    

    return this.http.post(url, body, options).pipe(map((res) => 
   {
    
     let patientBody=new PatientBody()

    patientBody.id=JsonQuery.value(res, JSON_PATHS.PATIENTBODY.ID) || '';
    patientBody.userId=JsonQuery.value(res, JSON_PATHS.PATIENTBODY.USERID) || '';
     patientBody.weight=JsonQuery.value(res, JSON_PATHS.PATIENTBODY.WEIGHT) || '';
     patientBody.height=JsonQuery.value(res, JSON_PATHS.PATIENTBODY.HEIGHT) || '';
    patientBody.date=moment(body.date).subtract(1,'day').format("DD/MM/YYYY") || '';

    
      this.patientBodies.push(patientBody)
      this.myRecordsService.bodySet=this.patientBodies
     this.humanBodiesCount+=1;
     return res;
    }
    ), catchError(e => throwError(e)) );
  }
  addImmunization(immunization:PatientImmunization){
    const url = `http://36765264api.medirec.me/api/Immunizations`
    let headers = new HttpHeaders();
    headers = headers.append('MedKey', '736db36f-7d1e-463c-bcec-15f9b1ca77f6'  );
    headers = headers.append('Content-Type', 'application/json');
    const options = {
      headers: headers
    };
    let immunizationRes={
      nextDoesDate:new Date(immunization.nextDate),
      dateGiven:new Date(immunization.date),
      userId:1,
      administratedBy:immunization.administratedBy,
      vaccineId:immunization.vaccineId,
      vaccineName:immunization.vaccineName,
    }
    return this.http.post(url, immunizationRes, options).pipe(map((res) => 
   {
    
     let immunization=new PatientImmunization()
     immunization.id=JsonQuery.value(res, JSON_PATHS.PATIENTIMMUNIZATION.ID) || '';
     immunization.userId=JsonQuery.value(res, JSON_PATHS.PATIENTIMMUNIZATION.USERID) || '';
     immunization.vaccineId=JsonQuery.value(res, JSON_PATHS.PATIENTIMMUNIZATION.VACCINEID) || '';
     immunization.vaccineName=this.vaccines.find(el=>el.vaccineId==immunization.vaccineId).name
     immunization.administratedBy=JsonQuery.value(res, JSON_PATHS.PATIENTIMMUNIZATION.ADMINISTRATEDBY) || '';
     immunization.date=moment(JsonQuery.value(res, JSON_PATHS.PATIENTIMMUNIZATION.DATE)).subtract(1,'day').format("DD/MM/YYYY") || '';
     immunization.nextDate=moment(JsonQuery.value(res, JSON_PATHS.PATIENTIMMUNIZATION.NEXTDATE) ).subtract(1,'day').format("DD/MM/YYYY")|| '';

    
      this.patientImmunization.push(immunization)
      this.patientImmunizations.push(immunization)
     this.immunizationsCount+=1;
     this.myRecordsService.immunizationtSet=this.patientImmunizations

     return res;
    }
    ), catchError(e => throwError(e)) );
  }
  addPressure(pressure){
    const url = `http://36765264api.medirec.me/api/BloodPressure`
    let headers = new HttpHeaders();
    headers = headers.append('MedKey', '736db36f-7d1e-463c-bcec-15f9b1ca77f6'  );
    headers = headers.append('Content-Type', 'application/json');
    const options = {
      headers: headers
    };

    return this.http.post(url, pressure, options).pipe(map((res) => 
   {
    
     let pressureRes=new PatientPressure()
    

     pressureRes.id=JsonQuery.value(res, JSON_PATHS.PATIENTPRESSURE.ID) || '';
     pressureRes.userId=JsonQuery.value(res, JSON_PATHS.PATIENTPRESSURE.USERID) || '';
     pressureRes.diastolic=JsonQuery.value(res, JSON_PATHS.PATIENTPRESSURE.DIASTOLIC) || '';
     pressureRes.systolic=JsonQuery.value(res, JSON_PATHS.PATIENTPRESSURE.SYSTOLIC) || '';
     pressureRes.date=moment(pressure.date).subtract(1,'day').format("DD/MM/YYYY") || '';
     

    
     
if(this.patientPressures.find(el=>pressureRes.date==el.date)){
  this.patientPressures.find(el=>pressureRes.date==el.date).diastolic=( +this.patientPressures.find(el=>pressureRes.date==el.date).diastolic+(+pressureRes.diastolic))/2+'';
  this.patientPressures.find(el=>pressureRes.date==el.date).systolic=( +this.patientPressures.find(el=>pressureRes.date==el.date).systolic+(+pressureRes.systolic))/2+'';
}
else{
  this.patientPressures.push(pressureRes)

  
  this.diastolic.push(+pressureRes.diastolic)
  this.systolic.push(+pressureRes.systolic)
 this.bloodPressureCount+=1;
  this.date.push(pressureRes.date)
}
this.patientPressuresDetails.push(pressureRes)
this.PressureCalculaion()
this.myRecordsService.pressureSet=this.patientPressuresDetails

     return res;
    }
    ), catchError(e => throwError(e)) );
  }
  GetVaccines(userId?: string) {
    this.vaccines=[]
    let url = 'http://36765264api.medirec.me/api/Vaccines';
    let headers = new HttpHeaders();
    headers = headers.append('MedKey', '736db36f-7d1e-463c-bcec-15f9b1ca77f6'  );
    const options = {
      headers: headers
    };
    return this.http.get(url, options).pipe(map((res:any[]) => {
    res.map(el=>{
      let vaccine=new PatientVaccines()
      vaccine.name=JsonQuery.value(el, JSON_PATHS.VACCINES.NAME) || '';
      vaccine.vaccineCode=JsonQuery.value(el, JSON_PATHS.VACCINES.CODE) || '';
      vaccine.vaccineId=JsonQuery.value(el, JSON_PATHS.VACCINES.ID) || '';
      this.vaccines.push(vaccine)
    })


      return res;
    }
    ), catchError(e => throwError(e)) );
    
  }
  GetAreas(cityId) {

    let url = `http://36765264api.medirec.me/api/Areas/${cityId}`;
    let headers = new HttpHeaders();
    headers = headers.append('MedKey', '736db36f-7d1e-463c-bcec-15f9b1ca77f6'  );
    const options = {
      headers: headers
    };
    return this.http.get(url, options).pipe(map((res:any[]) => {
      this.area=[]
    res.map(el=>{
      let areaRes=new Area()
      areaRes.nameEn=JsonQuery.value(el, JSON_PATHS.AREA.NAME) || '';
      areaRes.nameAr=JsonQuery.value(el, JSON_PATHS.AREA.NAMEAR) || '';
      areaRes.cityId=JsonQuery.value(el, JSON_PATHS.AREA.CITYID) || '';
      areaRes.areaCode=JsonQuery.value(el, JSON_PATHS.AREA.CODE) || '';
      areaRes.areaId=JsonQuery.value(el, JSON_PATHS.AREA.ID) || '';
      this.area.push(areaRes)
     
    })


      return res;
    }
    ), catchError(e => throwError(e)) );
    
  }
  GetCities(countryId?) {

    let url = 'http://36765264api.medirec.me/api/Cities';
    let headers = new HttpHeaders();
    headers = headers.append('MedKey', '736db36f-7d1e-463c-bcec-15f9b1ca77f6'  );
    const options = {
      headers: headers
    };
    return this.http.get(url, options).pipe(map((res:any[]) => {
      this.cities=[];
      res.map(el=>{
        let city=new City()
        city.nameEn=JsonQuery.value(el, JSON_PATHS.CITY.NAME) || '';
        city.nameAr=JsonQuery.value(el, JSON_PATHS.CITY.NAMEAR) || '';
        city.countryId=JsonQuery.value(el, JSON_PATHS.CITY.COUNTRYID) || '';
        city.countryCode=JsonQuery.value(el, JSON_PATHS.CITY.CODE) || '';
        city.cityId=JsonQuery.value(el, JSON_PATHS.CITY.ID) || '';
       
        this.cities.push(city)
      })
  
      return res;
    }
    ), catchError(e => throwError(e)) );
    
  }
}
