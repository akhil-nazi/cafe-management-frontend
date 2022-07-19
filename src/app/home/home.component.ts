import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { UserService } from '../services/user.service';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private dialog: MatDialog, private router : Router, private userService: UserService ) { }

  ngOnInit(): void {
   if(localStorage.getItem('token') != null){
    this.userService.checkToken().subscribe((response:any)=>{
      console.log('going through token is fine')
      this.router.navigate(['cafe/dashboard'])
    },(error:any)=>{
      console.log(error)
    })
   }
  }


signup(){
  const dialogConfig = new MatDialogConfig();
   dialogConfig.width = '420px'
   this.dialog.open( SignupComponent, dialogConfig)
}

  login(){
    const dialogConfig = new MatDialogConfig();
   dialogConfig.width = '420px'
   this.dialog.open( LoginComponent, dialogConfig)
  }



}
