
import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { UserService } from '../shared/services/user-service.service';
import {map} from 'rxjs/operators';
import { AppService } from '../app.service';


@Injectable()
export class UserProfileResolver implements Resolve<any> {

    constructor(private router:Router,private userService:UserService,private appService:AppService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
     
if(this.userService.patientMoreDetails&&this.userService.patientMoreDetails.fullName){
    return true
}
else{
    this.router.navigate(['/'])
    return false
}
    }


}
