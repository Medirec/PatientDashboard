import { Component, OnInit ,OnDestroy} from '@angular/core';
import { MyRecordsService } from '../my-records.service';
import { PatientConditions } from '../../shared/model/patient-conditions.model';
import { UserService } from '../../shared/services/user-service.service';
import { PatientContacts } from '../../shared/model/patient-contacts.model';
import { PatientBody } from '../../shared/model/patient-body.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit ,OnDestroy{
  editItem:PatientConditions=new PatientConditions()
  editContact:PatientContacts=new PatientContacts()
  bodyItem:PatientBody=new PatientBody()
  ngOnDestroy(): void {
    this.myRecordsService.dataSet=[]
  }
  
  constructor(private myRecordsService:MyRecordsService,private userService:UserService) {
 
   }

  ngOnInit() {
    console.log(this.userService.patientContactsDetails);
    
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
