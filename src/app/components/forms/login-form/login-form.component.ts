import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthInterceptor } from 'src/app/interceptors/auth.interceptor';
import { User } from 'src/app/models/userModel';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user.service';
import { DialogComponent } from '../../dialogs/dialog/dialog.component';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  @ViewChild(FormGroupDirective) formRef!: FormGroupDirective;

  loginForm!: FormGroup;

  errorMsgs: string[] = ['You must enter a value', 'Not a valid email', 'Your password must be at least 8 characters long']

  constructor(private fb: FormBuilder,
    public dialog: MatDialog,
    private authService: AuthService,
    // private userService: UserService,
    private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email:['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  getErrorMessage(formField: FormGroup['value']){

    if(formField == this.loginForm.controls['email']) {
      if(formField.hasError('required')) {
        return this.errorMsgs[0];
      }
      if(formField.hasError('email')) {
        return this.errorMsgs[1];
      }
    }

    if(formField == this.loginForm.controls['password']) {
      if(formField.hasError('required')) {
        return this.errorMsgs[0];
      }
      if(formField.hasError('minlength')) {
        return this.errorMsgs[2];
      }
    }
    return '';

  }

  openDialog(title: string, content: string): void {
    this.dialog.open(DialogComponent, {
      width: '250px',
      data: {newTitle: title, newContent: content}
    })
  }

  successfulOperation(){
    this.openDialog('Successfully logged in!', 'You will be rendered to your home page');
    this.router.navigate(['/home']);
  }

  rejectedOperation(){
    this.openDialog('Sorry.', 'Your email or password are not valid, please try again')
  }

  onSubmit(){
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.successfulOperation(),
        AuthInterceptor.accessToken = res.accessToken},
      error: () => this.rejectedOperation()
    })
    this.loginForm.reset();
    this.formRef.resetForm();
  }

}
