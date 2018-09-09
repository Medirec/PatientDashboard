
import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { UserService } from '../shared/services/user-service.service';
import {map} from 'rxjs/operators';
import { AppService } from '../app.service';
import { MyRecordsService } from './my-records.service';


@Injectable()
export class DetailsResolver implements Resolve<any> {

    constructor(private router:Router,private myRecordsService:MyRecordsService,private appService:AppService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
     
if(this.myRecordsService.type){
    return true
}
else{
    this.router.navigate(['/'])
    return false
}
    }


}
