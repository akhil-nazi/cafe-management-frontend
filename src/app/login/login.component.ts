import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services/user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { GlobalConstants } from '../shared/accordion/global-constant';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm : any = FormGroup;
  responseMessage: any ;
  constructor( public formbuilder: FormBuilder,
    public router : Router,
    public dialogRef: MatDialogRef< LoginComponent>,
    public userService : UserService,
    public snackbar : SnackbarService,) { }

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      email: [null, [Validators.required , Validators.pattern(GlobalConstants.emailRegex)]],
      password: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
    })
  }
  handleSubmit(){
    var formdata = this.loginForm.value;

    var data = {
      email:formdata.email,
      password: formdata.password
    }

    this.userService.login(data).subscribe((response: any)=>{
     this.dialogRef.close();
     this.snackbar.openSnackBar('login success','');
     localStorage.setItem('token',response.token)
     console.log(response)
     console.log(response.token)
     this.router.navigate(['/cafe/dashboard']);
    },(error)=>{
      if(error.error?.message){
        console.log('error')
        this.responseMessage = error.error?.message

      }
      else{
        console.log('ok')
        this.responseMessage = GlobalConstants.genericError
      }
      this.snackbar.openSnackBar(this.responseMessage,GlobalConstants.error)

    })
  }

}
