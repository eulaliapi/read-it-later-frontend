import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DialogComponent } from '../../dialogs/dialog/dialog.component';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
  @ViewChild(FormGroupDirective) formRef!: FormGroupDirective;

  signUpForm!: FormGroup;

  errorMsgs: string[] = ['You must enter a value', 'Your username must be at least 4 characters long', 'Not a valid email', 'Your password must be at least 8 characters long']

  constructor(private fb: FormBuilder, public dialog: MatDialog, private authService: AuthService) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      email:['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  getErrorMessage(formField: FormGroup['value']){
    if(formField == this.signUpForm.controls['name']) {
      if(formField.hasError('required')) {
        return this.errorMsgs[0];
      }
      if(formField.hasError('minlength')) {
        return this.errorMsgs[1];
      }
    }

    if(formField == this.signUpForm.controls['email']) {
      if(formField.hasError('required')) {
        return this.errorMsgs[0];
      }
      if(formField.hasError('email')) {
        return this.errorMsgs[2];
      }
    }

    if(formField == this.signUpForm.controls['password']) {
      if(formField.hasError('required')) {
        return this.errorMsgs[0];
      }
      if(formField.hasError('minlength')) {
        return this.errorMsgs[3];
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
    this.openDialog('Successfully signed up', 'You can now login!');
  }

  rejectOperation(){
    this.openDialog('Sorry!', 'Something went wrong, please try again.');
  }

  onSubmit(){
    this.authService.signUp(this.signUpForm.value).subscribe({
      next: ()  => this.successfulOperation(),
      error: () => this.rejectOperation()
    });
    this.signUpForm.reset();
    this.formRef.resetForm();
  }

}
