import { Component, OnInit,TemplateRef } from '@angular/core';
import { UserService } from '../shared/services/user-service.service';
import { PatientDetails } from '../shared/model/patient-details.model';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service'
import { AppService } from '../app.service';
@Component({
  selector: 'app-my-records',
  templateUrl: './my-records.component.html',
  styleUrls: ['./my-records.component.css']
})
export class MyRecordsComponent implements OnInit {
  modalRef: BsModalRef;
  constructor(private userService:UserService,private modalService: BsModalService,private appService:AppService) {
    console.log(this.userService.patientAllergies);
    this.appService.showLoader=false
   }

  ngOnInit() {
    
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
