import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';
import { GlobalConstants } from '../shared/accordion/global-constant';
import { DashboardService } from '../services/dashboard.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {

  responseMessage:any;
  data:any;
	ngAfterViewInit() { }

constructor(private dashboard:DashboardService,private snackbar: SnackbarService) {this.dashboardData()}

dashboardData(){
       this.dashboard.getdetails().subscribe((response:any)=>{
        this.data = response
        console.log("dashboard",response)
       },(error:any)=>{
        if(error.error?.message){
          this.responseMessage = error.error?.message
          console.log(this.responseMessage)
        }
        else{
          this.responseMessage = GlobalConstants.genericError
        }
        this.snackbar.openSnackBar(this.responseMessage,GlobalConstants.genericError)
       })
}

}
