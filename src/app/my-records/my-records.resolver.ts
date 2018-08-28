
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
       { return this.userService.GetPatientConditions().subscribe(()=>{
      return  this.userService.GetPatientPressure().subscribe(()=>{
        return  this.userService.GetPatientBodyInfo().subscribe()
         
      })
       })
        })
           
        })) 
    }


}
