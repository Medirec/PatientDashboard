
import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../shared/services/user-service.service';
import {map} from 'rxjs/operators';
import { AppService } from '../app.service';


@Injectable()
export class MyRecordsResolver implements Resolve<any> {

    constructor(private userService:UserService,private appService:AppService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
     
        this.appService.showLoader=true

            return this.userService.GetPatientDetails().pipe(map(()=>{
                return this.userService.GetPatientAllergies().subscribe(()=>
            { 
                return this.userService.GetPatientConditions().subscribe(()=>{
                this.userService.patientPressures=[]
                this.userService.patientPressuresDetails=[]
           return  this.userService.GetPatientPressure().subscribe(()=>{
               this.userService.GetPatientBodyInfo().subscribe()
              this.userService.GetPatientMedication().subscribe()
              this.userService.GetPatientMedicalDevice().subscribe()
              this.userService.GetPatientContacts().subscribe()
               this.userService.GetPatientImmunization().subscribe()
               this.userService.GetAllAllergies().subscribe()
               this.userService.GetAllBloodPressure().subscribe()
               this.userService.GetAllCondition().subscribe()
               this.userService.GetAllContacts().subscribe()
               this.userService.GetAllHumanBody().subscribe()
               this.userService.GetAllImmunization().subscribe()
               this.userService.GetAllMedicalDevice().subscribe()
               this.userService.GetAllMedication().subscribe()
               this.userService.GetAllResources().subscribe()
               this.userService.GetVaccines().subscribe()
               this .userService.GetCities().subscribe()
               window.setTimeout(()=>this.appService.showLoader=false)
           })
            })
             })
                
             })) 
        
       
    }


}
