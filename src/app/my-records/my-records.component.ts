import { Component, OnInit,TemplateRef } from '@angular/core';
import { UserService } from '../shared/services/user-service.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service'
import { AppService } from '../app.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { PatientContacts } from '../shared/model/patient-contacts.model';
import { Router } from '@angular/router';
import { MyRecordsService } from "./my-records.service";
import * as _ from "lodash";
class Upload {

  $key: string;
  file:File;
  name:string;
  url:string;
  progress:number;
  createdAt: Date = new Date();

  constructor(file:File) {
    this.file = file;
  }
}
@Component({
  selector: 'app-my-records',
  templateUrl: './my-records.component.html',
  styleUrls: ['./my-records.component.css']
})

export class MyRecordsComponent implements OnInit {
  contactError:boolean;
  editContant:PatientContacts=new PatientContacts();
  modalRef: BsModalRef;
  public addAllergyForm: FormGroup;
  public addConditionForm: FormGroup;
  public addMedicationForm: FormGroup;
  public addMedicalDeviceForm:FormGroup;
  public contactForm:FormGroup;
  showErrorMsg:boolean
  showErrorMsgMedication:boolean;
  showErrorMsgCondition:boolean
  showErrorMsgMedical:boolean
  currentUpload:Upload;
  dropzoneActive:boolean = false;
  constructor(private myRecordsService:MyRecordsService, private router: Router,private formBuilder5: FormBuilder,private formBuilder4: FormBuilder,private formBuilder3: FormBuilder,private formBuilder2: FormBuilder,private formBuilder: FormBuilder,private userService:UserService,private modalService: BsModalService,private appService:AppService) {
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
    this.contactForm = formBuilder5.group({
      name: ['', [Validators.required]],
      relation: ['', [Validators.required]],
      phone: ['', [Validators.required,Validators.pattern("^[0-9]{11}$")]],
      phone2: ['',[Validators.pattern("^[0-9]{11}$")]],
      email: ['', [Validators.required,Validators.email]],
    });
   }
   dropzoneState($event: boolean) {
    this.dropzoneActive = $event;
  }
  handleDrop(fileList: FileList) {
debugger
    let filesIndex = _.range(fileList.length)
    _.each(filesIndex, (idx) => {
      this.currentUpload = new Upload(fileList[idx]);
    }
    )
  }
  ngOnInit() {

  }

  openModal(template: TemplateRef<any>,contact?:PatientContacts) {
    this.modalRef = this.modalService.show(template);
    if(contact){
      this.editContant=contact
    }
  }
  hideModal() {
    this.modalRef.hide()
  
      this.editContant=new PatientContacts()
    
  }
  submit() {
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
  // lineChart
  public lineChartData:Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Systolic'},
    {data: [60, 48, 70, 50, 86, 60, 90], label: 'Diastolic'},
  ];
  public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions:any = {
    responsive: true, scales : { yAxes: [{ ticks: { steps : 40, stepValue : 40, max : 180,min:40 } }] } ,
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          
          const datasetLabel = data.datasets[tooltipItem.datasetIndex].label || '';
          return  datasetLabel + ': ' + tooltipItem.yLabel + '%';
        }
      }
    },
    
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: '#33bdb836',
      borderColor: '#33bdb8',
      pointBackgroundColor: '#fff',
      pointBorderColor: '#33bdb8',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: '#33bdb836',
      borderColor: '#33bdb8',
      pointBackgroundColor: '#fff',
      pointBorderColor: '#33bdb8',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },

  ];
  public lineChartLegend:boolean = false;
  public lineChartType:string = 'line';
 

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

  public editContact(){
    if (!this.contactForm.valid) {
      this.contactError = true
    }else{
      this.modalRef.hide()
      this.appService.showLoader=true 
      this.editContant.userId="1";
this.userService.addContact(this.editContant).subscribe(()=>{
  this.appService.showLoader=false 
},()=>this.appService.showLoader=false )
    }

  }
  details(type){
    this.myRecordsService.type=type
    switch (type) {
      case 'allergy':
      this.userService.getAllData(type).subscribe(()=>{
        this.appService.showLoader=false
        this.router.navigate(['/Details']);

          this.myRecordsService.dataSet=this.userService.patientAllergiesDetails

        },()=>{
        this.appService.showLoader=false

        })
        break;
        case 'condition':
        this.appService.showLoader=true
        this.userService.getAllData(type).subscribe(()=>{
        this.appService.showLoader=false
        this.router.navigate(['/Details']);

          this.myRecordsService.dataSet=this.userService.patientConditionsDetails

        },()=>{
        this.appService.showLoader=false

        })
        
        break;
        case 'medication':
        this.appService.showLoader=true
        this.userService.getAllData(type).subscribe(()=>{
        this.appService.showLoader=false
        this.router.navigate(['/Details']);

          this.myRecordsService.dataSet=this.userService.patientMedicationDetails

        },()=>{
        this.appService.showLoader=false

        })
        
        break;
        case 'device':
        this.appService.showLoader=true
        this.userService.getAllData(type).subscribe(()=>{
        this.appService.showLoader=false
        this.router.navigate(['/Details']);

          this.myRecordsService.dataSet=this.userService.patientMedicalDeviceDetails

        },()=>{
        this.appService.showLoader=false

        })
        
        break;
    
      default:
        break;
    }
  }
  editUserProfile(){
    this.router.navigate(['/DetailsProfile']);

  }
}
