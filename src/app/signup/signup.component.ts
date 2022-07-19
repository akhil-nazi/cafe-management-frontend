import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services/user.service';
import { GlobalConstants } from '../shared/accordion/global-constant';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
signupForm:any =  FormGroup;
responseMessage: any;
  constructor(private formBuilder: FormBuilder,private userService:UserService, private snackBar: SnackbarService
    , private dialogRef:MatDialogRef<SignupComponent>,private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
      contactName: [null, [Validators.required, Validators.pattern(GlobalConstants.contactNumberRegex)]],
      password: [null, [Validators.required]]
     })
  }

  handleSubmit(){
    var formdata = this.signupForm.value


    var data = {
      name:formdata.name,
      email:formdata.email,
      contactName: formdata.contactName,
      password: formdata.password

    }

    this.userService.signUp(data).subscribe((response: any)=>{

      this.dialogRef.close();
     this.responseMessage = response?.message;
     this.snackBar.openSnackBar(this.responseMessage,'');
     this.router.navigate(['/'])
    },(error)=>{
      if(error.error?.message){
        console.log('error')
        this.responseMessage = error.error?.message
      }
      else{
        console.log('ok')
        this.responseMessage = error.error?.message
      }
      this.snackBar.openSnackBar(this.responseMessage,GlobalConstants.error)

    })
  }

}
