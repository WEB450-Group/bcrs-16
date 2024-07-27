/*
============================================
; Title:  verify-email.component.ts
; Author: Professor Krasso
; Date: 11. July, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: Verify Emmail Component
;===========================================
*/
import { Component } from '@angular/core';
import { SecurityService } from '../security.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent {
  errMessage: string = '';
  isLoading: boolean = false;

  emailForm: FormGroup = this.fb.group({
    email: [null, Validators.compose([Validators.required, Validators.email])]
  })

  constructor( private fb: FormBuilder, private securityService: SecurityService, private router: Router ) {
    this.errMessage = '';
    this.isLoading = false;
  }

  submit() {
    this.isLoading = true;
    const email = this.emailForm.controls['email'].value.toLowerCase();
    console.log(email);
    console.log('Email from form:', email);

    this.securityService.verifyEmail(email).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/security/verify-questions'], {queryParams: {email}, skipLocationChange: true});
      },
      error: (err) => {
        console.log('Server error from API call', err);
        if(err.status === 404) {
          this.errMessage = "The email address you provided was not found in our system";
          this.isLoading = false;
          return
        }
        this.errMessage = "There was a problem verifying your email address, please try again or contact the system administrator";
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    })
  }
}
