import { Component, OnInit ,OnDestroy, ViewChildren, TemplateRef, QueryList, ViewChild} from '@angular/core';
import { MyRecordsService } from '../my-records.service';
import { PatientConditions } from '../../shared/model/patient-conditions.model';
import { UserService } from '../../shared/services/user-service.service';
import { PatientContacts } from '../../shared/model/patient-contacts.model';
import { PatientBody } from '../../shared/model/patient-body.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit ,OnDestroy{
  filterChar:string
  editItem:PatientConditions=new PatientConditions()
  editContact:PatientContacts=new PatientContacts()
  bodyItem:PatientBody=new PatientBody()
  contactError:boolean;
  modalRef: BsModalRef;
  public addAllergyForm: FormGroup;
  public addConditionForm: FormGroup;
  public addMedicationForm: FormGroup;
  public addMedicalDeviceForm:FormGroup;
  public contactForm:FormGroup;
  public addBody:FormGroup;
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
  ngOnDestroy(): void {
    this.myRecordsService.dataSet=[]
    this.myRecordsService.contactSet=[]
    this.myRecordsService.immunizationtSet=[]
  }
  
  constructor(private myRecordsService:MyRecordsService,private formBuilder7: FormBuilder,private formBuilder6: FormBuilder,private formBuilder5: FormBuilder,private formBuilder4: FormBuilder,private formBuilder3: FormBuilder,private formBuilder2: FormBuilder,private formBuilder: FormBuilder,private userService:UserService,private modalService: BsModalService,private appService:AppService) {
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
    this.addBody = formBuilder6.group({
      height: ['', [Validators.required]],
      weight: ['', [Validators.required]],
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
      default:
        break;
    }

   
  }
    hideModal() {
    this.modalRef.hide()
  
    
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
      },()=>{
       this.appService.showLoader=false 

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
      },()=>{
       this.appService.showLoader=false 

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

      this.userService.addBody({
        userId:1,
        height:this.addBody.controls['height'].value,
        weight:this.addBody.controls['weight'].value,
        date:new Date()
      }).subscribe(()=>{
       this.appService.showLoader=false 
      },()=>{
       this.appService.showLoader=false 

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
      },()=>{
       this.appService.showLoader=false 

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
      },()=>{
       this.appService.showLoader=false 

      })
    }
  }
onClick(condition){
  event.stopPropagation()
  if(this.myRecordsService.bodySet.length){
    this.bodyItem={...condition}
  }else{
    this.editItem={...condition}
  }

}
onClickContacts(contact){
  event.stopPropagation()
  this.editContact={...contact}
 
}
submit(){
  event.stopPropagation()
if(this.editItem.id){
  this.userService.update(this.editItem,this.myRecordsService.type).subscribe(()=>{
    this.editItem=new PatientConditions()
    this.bodyItem=new PatientBody()
  },()=>   {this.editItem=new PatientConditions()
    this.bodyItem=new PatientBody()
    this.editContact=new PatientContacts()})
}
  else{
    this.userService.update(this.bodyItem,this.myRecordsService.type).subscribe(()=>{
      this.editItem=new PatientConditions()
      this.bodyItem=new PatientBody()
    },()=>   {this.editItem=new PatientConditions()
      this.bodyItem=new PatientBody()
      this.editContact=new PatientContacts()})
  }
}
submitContact(){
  event.stopPropagation()
  this.userService.editContact(this.editContact).subscribe(()=>{
    this.editContact=new PatientContacts()
  },()=>   {this.editItem=new PatientConditions()
    this.editContact=new PatientContacts()})
}
cancel(){
  event.stopPropagation()
  this.editItem=new PatientConditions()
  this.editContact=new PatientContacts()
  this.bodyItem=new PatientBody()
}
delete(data){
  event.stopPropagation()

  this.userService.DeleteData(this.myRecordsService.type,data).subscribe(()=>{
    this.editItem=new PatientConditions()
    this.editContact=new PatientContacts()
    this.bodyItem=new PatientBody()

  },()=>   {this.editItem=new PatientConditions()
  this.editContact=new PatientContacts()
  this.bodyItem=new PatientBody()})
  
}
}
