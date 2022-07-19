import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { GlobalConstants } from '../shared/accordion/global-constant';
import { AuthService } from './auth.service';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {

  constructor(private router: Router,private snackbar: SnackbarService, private auth:AuthService) { }

  canActivate(route:ActivatedRouteSnapshot): boolean{
    let expectedRoleArray = route.data;
    expectedRoleArray = expectedRoleArray.expectedRole;

    var token :any  = localStorage.getItem('token');
    console.log(token)
    var tokenPayload: any;
    try{
      tokenPayload = jwtDecode(token)
     
    }
    catch(err){
      localStorage.clear();
      this.router.navigate(['/'])
    }

    let checkRole = false;

    for(let i=0 ; i< expectedRoleArray.length; i++ ){
      if(expectedRoleArray[i] === tokenPayload.role){
        checkRole = true;
      }

    }


    if(tokenPayload.role == 'user' || tokenPayload.role == 'admin'){
      if(this.auth.isAuthenticated() && checkRole){

        return true
      }
      this.snackbar.openSnackBar(GlobalConstants.unauthorized, GlobalConstants.error);
      this.router.navigate(['/cafe/dashboard'])
      return false
    }
    else{
      this.router.navigate(['/']);
      localStorage.clear();
      return false
    }


  }
}
