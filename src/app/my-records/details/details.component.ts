import { Component, OnInit ,OnDestroy} from '@angular/core';
import { MyRecordsService } from '../my-records.service';
import { PatientConditions } from '../../shared/model/patient-conditions.model';
import { UserService } from '../../shared/services/user-service.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit ,OnDestroy{
  ngOnDestroy(): void {
    this.myRecordsService.dataSet=[]
  }
  editItem:PatientConditions
  constructor(private myRecordsService:MyRecordsService,private userService:UserService) { }

  ngOnInit() {
  }
onClick(condition){
  event.stopPropagation()

  this.editItem=condition
}
submit(){
  event.stopPropagation()
  this.userService.update(this.editItem,this.myRecordsService.type).subscribe(()=>{
    this.editItem=new PatientConditions()
  })
}
cancel(){
  event.stopPropagation()
  this.editItem=new PatientConditions()
}
delete(data){
  event.stopPropagation()

  this.userService.DeleteData(this.myRecordsService.type,data).subscribe(()=>{
    this.editItem=new PatientConditions()
  })
  
}
}
