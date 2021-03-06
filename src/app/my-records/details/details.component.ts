import { Component, OnInit ,OnDestroy, ViewChildren, TemplateRef, QueryList, ViewChild} from '@angular/core';
import { MyRecordsService } from '../my-records.service';
import { PatientConditions } from '../../shared/model/patient-conditions.model';
import { UserService } from '../../shared/services/user-service.service';
import { PatientContacts } from '../../shared/model/patient-contacts.model';
import { PatientBody } from '../../shared/model/patient-body.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../../app.service';
import { PatientImmunization } from '../../shared/model/patient-immunization.model';
import { PatientPressure } from '../../shared/model/patient-pressure.model';
import * as moment from 'moment';

declare let alertify:any;

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit ,OnDestroy{

  adminstrated=[{
    id:1,
    value:'Hospital'
  },{
    id:2,
    value:'Clinic'
  }]
  filterChar:string
  searchDate;
  administratedBy;
  editItem:PatientConditions=new PatientConditions()
  editContact:PatientContacts=new PatientContacts()
  bodyItem:PatientBody=new PatientBody()
  pressureItem:PatientPressure=new PatientPressure()
  immunizationItem:PatientImmunization=new PatientImmunization()
  contactError:boolean;
  modalRef: BsModalRef;
  addImmunization:FormGroup
  public addAllergyForm: FormGroup;
  public addConditionForm: FormGroup;
  public addMedicationForm: FormGroup;
  public addMedicalDeviceForm:FormGroup;
  public contactForm:FormGroup;
  public addBody:FormGroup;
  public addPressure:FormGroup;
  showErrorMsg:boolean
  showErrorMsgMedication:boolean;
  showErrorMsgCondition:boolean
  showErrorMsgMedical:boolean
  bodyError:boolean
  @ViewChild('template') templates;
  @ViewChild('condition') condition;
  @ViewChild('medication') medication;
  @ViewChild('medicalDevice') medicalDevice;
  @ViewChild('contact') contact;
  @ViewChild('body') body;
  @ViewChild('immunization') immunization;
  @ViewChild('pressure') pressure;
  name:string;
  ngOnDestroy(): void {
    this.myRecordsService.dataSet=[]
    this.myRecordsService.contactSet=[]
    this.myRecordsService.immunizationtSet=[]
    this.myRecordsService.pressureSet=[]
    this.myRecordsService.bodySet=[]
  }
  
  constructor(private myRecordsService:MyRecordsService,private formBuilder8: FormBuilder,private formBuilder7: FormBuilder,private formBuilder6: FormBuilder,private formBuilder5: FormBuilder,private formBuilder4: FormBuilder,private formBuilder3: FormBuilder,private formBuilder2: FormBuilder,private formBuilder: FormBuilder,private userService:UserService,private modalService: BsModalService,private appService:AppService) {
    this.addAllergyForm = formBuilder.group({
      name: ['', [Validators.required]],
    });
    this.addConditionForm = formBuilder2.group({
      name: ['', [Validators.required]],
    });
    this.addMedicationForm = formBuilder3.group({
      name: ['', [Validators.required]],
    });
    this.addMedicalDeviceForm = formBuilder4.group({
      name: ['', [Validators.required]],
    });
    this.addBody = formBuilder7.group({
      height: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      date: [new Date(), [Validators.required]],

    });
    this.addPressure = formBuilder8.group({
      diastolic: ['', [Validators.required]],
      systolic: ['', [Validators.required]],
      date: [new Date(), [Validators.required]],
    });
    this.addImmunization = formBuilder6.group({
      vaccines: ['', [Validators.required]],
      adminstrated: ['', [Validators.required]],
      date: ['', [Validators.required]],
      dateNext: ['', [Validators.required]],
    });
    this.contactForm = formBuilder5.group({
      name: ['', [Validators.required]],
      relation: ['', [Validators.required]],
      phone: ['', [Validators.required,Validators.pattern("^[0-9]{11}$")]],
      phone2: ['',[Validators.pattern("^[0-9]{11}$")]],
      email: ['', [Validators.required,Validators.email]],
    });


  }

  ngOnInit() {
    switch (this.myRecordsService.type) {
      case 'allergy':
this.name='Allergies'     
        break;
        case 'condition':
    
        this.name='Condition'     
        
        break;
        case 'medication':
   
        this.name='Medication'     
   
        
        break;
        case 'device':
        this.name='Medical Device'  
   
        
        break;
        case 'contact':
        this.name='Contact Info'  
    
        
        break;
        case 'body':
        this.name='Human Body'  
        
        break;
        case 'immunization':
        this.name='Immunization'  
        
        break;
        case 'pressure':
        this.name='Pressure'  
        break;
        case 'resource':
        this.name='Resources'  
        break;
      default:
        break;
    }
    
  }
  openModal() {
    switch (this.myRecordsService.type) {
      case 'allergy':
    this.modalRef = this.modalService.show(this.templates);
     
        break;
        case 'condition':
    
    this.modalRef = this.modalService.show(this.condition);
        
        break;
        case 'medication':
   
        this.modalRef = this.modalService.show(this.medication);
   
        
        break;
        case 'device':
        this.modalRef = this.modalService.show(this.medicalDevice);
   
        
        break;
        case 'contact':
        this.modalRef = this.modalService.show(this.contact);
    
        
        break;
        case 'body':
    this.modalRef = this.modalService.show(this.body);
        
        break;
          case 'immunization':
    this.modalRef = this.modalService.show(this.immunization);
        
        break;
        case 'pressure':
        this.modalRef = this.modalService.show(this.pressure);
            
            break;
      default:
        break;
    }

   
  }
    hideModal() {
    this.modalRef.hide()
  
    
  }
   submitImmunization(){
    if (!this.addImmunization.valid) {
    
    }
    else{
  
      this.modalRef.hide()
      this.appService.showLoader=true 
      let _date=moment(this.addImmunization.controls['date'].value, "DD/MM/YYYY").add(1,'day').format("DD/MM/YYYY")
      const dateRes=_date.split('/')
      _date=dateRes[1]+'/'+dateRes[0]+'/'+dateRes[2]
      let _dateNext=moment(this.addImmunization.controls['dateNext'].value, "DD/MM/YYYY").add(1,'day').format("DD/MM/YYYY")
      const dateResNext=_dateNext.split('/')
      _dateNext=dateResNext[1]+'/'+dateResNext[0]+'/'+dateResNext[2]
      let immunization=new PatientImmunization()
     immunization.date=_date;
     immunization.nextDate=_dateNext;
     immunization.administratedBy=this.adminstrated.find(el=>el.id==this.addImmunization.controls['adminstrated'].value).value; 
     immunization.vaccineName=this.userService.vaccines.find(el=>el.vaccineId==this.addImmunization.controls['vaccines'].value).name
     immunization.vaccineId=this.addImmunization.controls['vaccines'].value;
      this.userService.addImmunization(
        immunization
      ).subscribe(()=>{
       this.appService.showLoader=false 
    alertify.success('record successfully added'); 

      },()=>{
       this.appService.showLoader=false 
       alertify.error('sorry, somthing went wrong'); 

      })
    }
  }
  submitAllergy() {
    if (!this.addAllergyForm.valid) {
      this.showErrorMsg = true
    }
    else{
      this.showErrorMsg = false

      this.modalRef.hide()
      this.appService.showLoader=true 

      this.userService.addAllergies({
        userId:1,
        name:this.addAllergyForm.controls['name'].value,
      }).subscribe(()=>{
       this.appService.showLoader=false 
    alertify.success('record successfully added'); 

      },()=>{
       this.appService.showLoader=false 
       alertify.error('sorry, somthing went wrong'); 

      })
    }
  }
  submitCondition() {
    if (!this.addConditionForm.valid) {
      this.showErrorMsgCondition = true
    }
    else{
      this.showErrorMsgCondition = false

      this.modalRef.hide()
      this.appService.showLoader=true 

      this.userService.addConditions({
        userId:1,
        name:this.addConditionForm.controls['name'].value,
      }).subscribe(()=>{
       this.appService.showLoader=false 
    alertify.success('record successfully added'); 

      },()=>{
       this.appService.showLoader=false 
       alertify.error('sorry, somthing went wrong'); 

      })
    }
  }
  submitBody(){
    if (!this.addBody.valid) {
      this.bodyError = true
    }
    else{
      this.bodyError = false

      this.modalRef.hide()
      this.appService.showLoader=true 
      let date=moment(this.addBody.controls['date'].value, "DD/MM/YYYY").add(1,'day').format("DD/MM/YYYY")
      const dateRes=date.split('/')
      date=dateRes[1]+'/'+dateRes[0]+'/'+dateRes[2]
      this.userService.addBody({
        userId:1,
        height:this.addBody.controls['height'].value,
        weight:this.addBody.controls['weight'].value,
        date:new Date(date)
      }).subscribe(()=>{
       this.appService.showLoader=false 
    alertify.success('record successfully added'); 

      },()=>{
       this.appService.showLoader=false 
       alertify.error('sorry, somthing went wrong'); 

      })
    }
  }
  conditionNameChange(){
    this.showErrorMsgCondition = false;

  }
  medicationNameChange(){
    this.showErrorMsgMedication = false;

  }
  allergiesNameChange(){
    this.showErrorMsg = false;

  }
  submitMedication(){
    if (!this.addMedicationForm.valid) {
      this.showErrorMsgMedication = true
    }
    else{
      this.showErrorMsgMedication = false

      this.modalRef.hide()
      this.appService.showLoader=true 

      this.userService.addMedication({
        userId:1,
        name:this.addMedicationForm.controls['name'].value,
      }).subscribe(()=>{
       this.appService.showLoader=false 
    alertify.success('record successfully added'); 

      },()=>{
       this.appService.showLoader=false 
       alertify.error('sorry, somthing went wrong'); 


      })
    }
  }
  submitMedicalDevice(){
    if (!this.addMedicalDeviceForm.valid) {
      this.showErrorMsgMedical = true
    }
    else{
      this.showErrorMsgMedical = false

      this.modalRef.hide()
      this.appService.showLoader=true 

      this.userService.addMedicalDevice({
        userId:1,
        name:this.addMedicalDeviceForm.controls['name'].value,
        
      }).subscribe(()=>{
       this.appService.showLoader=false 
    alertify.success('record successfully added'); 

      },()=>{
       this.appService.showLoader=false 
       alertify.error('sorry, somthing went wrong'); 
       

      })
    }
  }
onClick(condition){
  event.stopPropagation()
  if(this.myRecordsService.bodySet.length){
    this.bodyItem={...condition}
  }else if(this.myRecordsService.pressureSet.length){
    this.pressureItem={...condition}

  }else if(this.myRecordsService.immunizationtSet.length){
    this.immunizationItem={...condition}
    this.immunizationItem.vaccineId=this.userService.vaccines.find(el=>el.name==this.immunizationItem.vaccineName).vaccineId
this.administratedBy=this.adminstrated.find(el=>el.value==this.immunizationItem.administratedBy).id; 
  }
  else {
    this.editItem={...condition}

  }

}
onClickContacts(contact){
  event.stopPropagation()
  this.editContact={...contact}
 
}
submit(){
  event.stopPropagation()
  this.appService.showLoader=true

if(this.editItem.id){
  this.userService.update(this.editItem,this.myRecordsService.type).subscribe(()=>{
    this.editItem=new PatientConditions()
    this.bodyItem=new PatientBody()
    this.appService.showLoader=false

    alertify.success('record successfully updated'); 

  },()=>   {this.editItem=new PatientConditions()
    this.bodyItem=new PatientBody()
    this.editContact=new PatientContacts()
    this.appService.showLoader=false

    alertify.error('sorry, somthing went wrong'); 
  })
}
else if(this.immunizationItem.id){
   let _date=moment(this.immunizationItem.date, "DD/MM/YYYY").add(1,'day').format("DD/MM/YYYY")
      const dateRes=_date.split('/')
      _date=dateRes[1]+'/'+dateRes[0]+'/'+dateRes[2]
      let _dateNext=moment(this.immunizationItem.nextDate, "DD/MM/YYYY").add(1,'day').format("DD/MM/YYYY")
      const dateResNext=_dateNext.split('/')
      _dateNext=dateResNext[1]+'/'+dateResNext[0]+'/'+dateResNext[2]
      this.immunizationItem.date=_date
      this.immunizationItem.nextDate=_dateNext
     this.immunizationItem.administratedBy=  this.adminstrated.find(el=>el.id==this.administratedBy).value; 
      this.immunizationItem.vaccineName=this.userService.vaccines.find(el=>el.vaccineId==this.immunizationItem.vaccineId).name
  this.userService.update(this.immunizationItem,this.myRecordsService.type).subscribe(()=>{
    this.editItem=new PatientConditions()
    this.bodyItem=new PatientBody()
    this.immunizationItem=new PatientImmunization()
    this.appService.showLoader=false

    alertify.success('record successfully updated'); 

  },()=>   {this.editItem=new PatientConditions()
    this.bodyItem=new PatientBody()
    this.editContact=new PatientContacts()
    this.appService.showLoader=false

    alertify.error('sorry, somthing went wrong'); 
  })
}else if(this.pressureItem.id){
   let _date=moment(this.pressureItem.date, "DD/MM/YYYY").add(1,'day').format("DD/MM/YYYY")
      const dateRes=_date.split('/')
      _date=dateRes[1]+'/'+dateRes[0]+'/'+dateRes[2]
     
      this.pressureItem.date=_date;
     
  this.userService.update(this.pressureItem,this.myRecordsService.type).subscribe(()=>{
    this.editItem=new PatientConditions()
    this.bodyItem=new PatientBody()
    this.immunizationItem=new PatientImmunization()
    this.pressureItem=new PatientPressure()
    this.appService.showLoader=false

    alertify.success('record successfully updated'); 

  },()=>   {this.editItem=new PatientConditions()
    this.bodyItem=new PatientBody()
    this.editContact=new PatientContacts()
    this.pressureItem=new PatientPressure()

    this.appService.showLoader=false

    alertify.error('sorry, somthing went wrong'); 
  })
}
  else{
    let date=moment(this.bodyItem.date, "DD/MM/YYYY").add(1,'day').format("DD/MM/YYYY")
    const dateRes=date.split('/')
    this.bodyItem.date=dateRes[1]+'/'+dateRes[0]+'/'+dateRes[2]
    this.userService.update(this.bodyItem,this.myRecordsService.type).subscribe(()=>{
      this.editItem=new PatientConditions()
      this.bodyItem=new PatientBody()
      this.appService.showLoader=false 

    alertify.success('record successfully updated'); 

    },()=>   {this.editItem=new PatientConditions()
      this.bodyItem=new PatientBody()
      this.editContact=new PatientContacts()
      this.appService.showLoader=false 
      alertify.error('sorry, somthing went wrong'); 
    
    })
  }
}

public editContacts(){
  if (!this.contactForm.valid) {
    this.contactError = true
  }else{
    this.modalRef.hide()
    this.appService.showLoader=true 
    this.editContact.userId="1";
this.userService.addContact(this.editContact).subscribe(()=>{
this.appService.showLoader=false 
},()=>this.appService.showLoader=false )
  }

}
submitContact(){
  event.stopPropagation()
  this.appService.showLoader=true

  this.userService.editContact(this.editContact).subscribe(()=>{
    this.editContact=new PatientContacts()
    this.appService.showLoader=false

    alertify.success('record successfully updated'); 

  },()=>   {this.editItem=new PatientConditions()
    this.editContact=new PatientContacts()
    this.appService.showLoader=false

    alertify.error('sorry, somthing went wrong'); 
  })
}
cancel(){
  event.stopPropagation()
  this.editItem=new PatientConditions()
  this.editContact=new PatientContacts()
  this.bodyItem=new PatientBody()
  this.pressureItem=new PatientPressure()
  this.immunizationItem=new PatientImmunization()
}
delete(data){
  event.stopPropagation()
  this.appService.showLoader=true

  this.userService.DeleteData(this.myRecordsService.type,data).subscribe(()=>{
    this.editItem=new PatientConditions()
    this.editContact=new PatientContacts()
    this.bodyItem=new PatientBody()
    this.pressureItem=new PatientPressure()
    this.appService.showLoader=false

    alertify.success('record successfully deleted'); 

  },()=>   {this.editItem=new PatientConditions()
    this.editItem=new PatientConditions()
    this.editContact=new PatientContacts()
    this.bodyItem=new PatientBody()
    this.pressureItem=new PatientPressure()
  this.appService.showLoader=false

  alertify.error('sorry, somthing went wrong'); 
})
  
}
submitPressure(){
  if (!this.addPressure.valid) {

  }
  else{
    

    this.modalRef.hide()
    this.appService.showLoader=true 
    let date=moment(this.addPressure.controls['date'].value, "DD/MM/YYYY").add(1,'day').format("DD/MM/YYYY")
    const dateRes=date.split('/')
    date=dateRes[1]+'/'+dateRes[0]+'/'+dateRes[2]
    this.userService.addPressure({
      userId:1,
      diastolic:this.addPressure.controls['diastolic'].value,
      systolic:this.addPressure.controls['systolic'].value,
      date:new Date(date)
    }).subscribe(()=>{
     this.appService.showLoader=false 
  alertify.success('record successfully added'); 

    },()=>{
     this.appService.showLoader=false 
     alertify.error('sorry, somthing went wrong'); 

    })
  }
}
}
