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
import * as moment from 'moment';
import { PatientImmunization } from '../shared/model/patient-immunization.model';

declare let alertify:any;

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

  adminstrated=[{
    id:1,
    value:'Hospital'
  },{
    id:2,
    value:'Clinic'
  }]
  change:boolean;
  dateNext= new Date();
  date=new Date();
  contactError:boolean;
  editContant:PatientContacts=new PatientContacts();
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
  currentUpload:Upload;
  dropzoneActive:boolean = false;
  from=new Date();
  to=new Date();
  sevenDays:boolean;
  FourteenDays:boolean;
  AVGSystolic:number=0;
  AVGDiastolic:number=0;
  noOfDays:number=7;
  constructor(private myRecordsService:MyRecordsService, private router: Router,private formBuilder8: FormBuilder,private formBuilder7: FormBuilder,private formBuilder6: FormBuilder,private formBuilder5: FormBuilder,private formBuilder4: FormBuilder,private formBuilder3: FormBuilder,private formBuilder2: FormBuilder,private formBuilder: FormBuilder,private userService:UserService,private modalService: BsModalService,private appService:AppService) {
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
    let dates=[]
     Array(7).fill(7).map((i, idx) =>{
     
    dates.push( moment().subtract(idx, "d").format("DD/MM/YYYY"))
     });
let count=0;
dates.map(el=>{

  if(this.userService.patientPressures.find(e=>e.date===el)){
    count++;
this.AVGSystolic+=+this.userService.patientPressures.find(e=>e.date===el).systolic
this.AVGDiastolic+=+this.userService.patientPressures.find(e=>e.date===el).diastolic
  }

   })
   if(this.AVGSystolic||this.AVGDiastolic){
    this.AVGSystolic=Math.round(this.AVGSystolic/count)
    this.AVGDiastolic=Math.round(this.AVGDiastolic/count)
   }

   }
   dropzoneState($event: boolean) {
    this.dropzoneActive = $event;
  }
  handleDrop(fileList: FileList) {

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
        this.userService.GetPatientBodyInfo().subscribe(()=>{
          this.appService.showLoader=false 

        },()=>{
       this.appService.showLoader=false 

        })

    alertify.success('record successfully added'); 

      },()=>{
       this.appService.showLoader=false 
       alertify.error('sorry, somthing went wrong'); 

      })
    }
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
  // lineChart
  public lineChartData:Array<any> = [
    {data: this.userService.systolic, label: 'Systolic'},
    {data:  this.userService.diastolic, label: 'Diastolic'},
  ];
  public lineChartLabels:Array<any> = this.userService.date;
  public lineChartOptions:any = {
    responsive: true, scales : { yAxes: [{ ticks: { steps : 40, stepValue : 40, max : 140,min:0 } }] } ,
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          
          const datasetLabel = data.datasets[tooltipItem.datasetIndex].label || '';
          return  datasetLabel + ': ' + tooltipItem.yLabel ;
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
  }
 
  public chartHovered(e:any):void {
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
        case 'contact':
        this.appService.showLoader=true
        this.userService.getAllData(type).subscribe(()=>{
        this.appService.showLoader=false
        this.router.navigate(['/Details']);

          this.myRecordsService.contactSet=this.userService.patientContactsDetails

        },()=>{
        this.appService.showLoader=false

        })
        
        break;
        case 'body':
         if(this.userService.patientBody){
        this.appService.showLoader=true
        this.userService.getAllData(type).subscribe(()=>{
        this.appService.showLoader=false
        this.router.navigate(['/Details']);

          this.myRecordsService.bodySet=this.userService.patientBodies

        },()=>{
        this.appService.showLoader=false

        })
         }
        break;
        case 'immunization':
     if(this.userService.patientImmunization.length){
        this.appService.showLoader=true
        this.userService.getAllData(type).subscribe(()=>{
        this.appService.showLoader=false
        this.router.navigate(['/Details']);

                   this.myRecordsService.immunizationtSet=this.userService.patientImmunizations

        },()=>{
        this.appService.showLoader=false

        })
         }

     
       
        
        break;
        case 'pressure':

        this.router.navigate(['/Details']);

          this.myRecordsService.pressureSet=this.userService.patientPressuresDetails
        
        break;
      default:
        break;
    }
  }
  editUserProfile(){
    this.appService.showLoader=true
    this.userService.GetPatientMoreDetails().subscribe(()=>{
      
    this.appService.showLoader=false
this.userService.GetAreas(this.userService.patientMoreDetails.cityId).subscribe()
      this.router.navigate(['/DetailsProfile']);

    },()=>this.appService.showLoader=false)

  }
  getSeven(){
    this.sevenDays=true
    this.FourteenDays=false
    this.lineChartLabels.length = 0
   Array(7).fill(7).map((i, idx) =>{
     
     this.lineChartLabels.push( moment().subtract(idx, "d").format("DD/MM/YYYY"))
     });
     this.lineChartLabels.reverse()
       this.lineChartData=[]
  this.lineChartData[0]={data:[],label:'Systolic'}
  this.lineChartData[1]={data:[],label:'Diastolic'}
this.lineChartLabels.map(el=>{

  if(this.userService.patientPressures.find(e=>e.date===el)){
this.lineChartData[0].data.push(+this.userService.patientPressures.find(e=>e.date===el).systolic)
this.lineChartData[1].data.push(+this.userService.patientPressures.find(e=>e.date===el).diastolic)
  }
  else{
    this.lineChartData[0].data.push(0)
this.lineChartData[1].data.push(0)
  }
})
  }
  dateChange(){
    this.change=true
  }
  getFourteen(){
    this.sevenDays=false
    this.FourteenDays=true
      this.lineChartLabels.length = 0
   Array(14).fill(14).map((i, idx) =>{
     
     this.lineChartLabels.push( moment().subtract(idx, "d").format("DD/MM/YYYY"))
     });
     this.lineChartLabels.reverse()
       this.lineChartData=[]
  this.lineChartData[0]={data:[],label:'Systolic'}
  this.lineChartData[1]={data:[],label:'Diastolic'}
this.lineChartLabels.map(el=>{

if(this.userService.patientPressures.find(e=>e.date===el)){
this.lineChartData[0].data.push(+this.userService.patientPressures.find(e=>e.date===el).systolic)
this.lineChartData[1].data.push(+this.userService.patientPressures.find(e=>e.date===el).diastolic)
  }
  else{
    this.lineChartData[0].data.push(0)
this.lineChartData[1].data.push(0)
  }
})
  }
  getDate(){
    
    if(moment(this.to).format("DD/MM/YYYY")==moment(this.from).format("DD/MM/YYYY")){
      this.lineChartLabels.length=0
      this.lineChartLabels.push(moment(this.to).format("DD/MM/YYYY"))
      this.lineChartData=[]
 this.lineChartData[0]={data:[],label:'Systolic'}
 this.lineChartData[1]={data:[],label:'Diastolic'}
      if(this.userService.patientPressures.find(e=>e.date===moment(this.to).format("DD/MM/YYYY"))){
        this.lineChartData[0].data.push(+this.userService.patientPressures.find(e=>e.date===moment(this.to).format("DD/MM/YYYY")).systolic)
        this.lineChartData[1].data.push(+this.userService.patientPressures.find(e=>e.date===moment(this.to).format("DD/MM/YYYY")).diastolic)
          }
          else{
            this.lineChartData[0].data.push(0)
        this.lineChartData[1].data.push(0)
          }
    }
    else if(moment(this.to).diff(this.from, 'days')==0){
      this.lineChartLabels.length=0
      this.lineChartLabels.push(moment(this.from).format("DD/MM/YYYY"))
      this.lineChartLabels.push(moment(this.from).add(1, "d").format("DD/MM/YYYY"))
      this.lineChartData=[]
 this.lineChartData[0]={data:[],label:'Systolic'}
 this.lineChartData[1]={data:[],label:'Diastolic'}
      if(this.userService.patientPressures.find(e=>e.date===moment(this.to).format("DD/MM/YYYY"))){
        this.lineChartData[0].data.push(+this.userService.patientPressures.find(e=>e.date===moment(this.to).format("DD/MM/YYYY")).systolic)
        this.lineChartData[1].data.push(+this.userService.patientPressures.find(e=>e.date===moment(this.to).format("DD/MM/YYYY")).diastolic)
          }
          else{
            this.lineChartData[0].data.push(0)
        this.lineChartData[1].data.push(0)
          }
    }
    else if(moment(this.to).diff(this.from, 'days')+1>0){
      this.lineChartLabels.length=0
      let len=(moment(this.to,"DD/MM/YYYY").diff(moment(this.from,"DD/MM/YYYY"), 'days'))+1
      if(!this.change){

        len+=1;
      }
      Array(len).fill(14).map((i, idx) =>{
        this.lineChartLabels.push( moment(this.from).add(idx, "d").format("DD/MM/YYYY"))
        });
          this.lineChartData=[]
     this.lineChartData[0]={data:[],label:'Systolic'}
     this.lineChartData[1]={data:[],label:'Diastolic'}
   this.lineChartLabels.map(el=>{
   
   if(this.userService.patientPressures.find(e=>e.date===el)){
   this.lineChartData[0].data.push(+this.userService.patientPressures.find(e=>e.date===el).systolic)
   this.lineChartData[1].data.push(+this.userService.patientPressures.find(e=>e.date===el).diastolic)
     }
     else{
       this.lineChartData[0].data.push(0)
   this.lineChartData[1].data.push(0)
     }
   })
    }else{
      alertify.error('sorry, wrong date please try again'); 

    }
    
  }
}
