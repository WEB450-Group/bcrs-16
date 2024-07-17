import { AuthService } from 'src/app/shared/auth.service';
/*
============================================
; Title:  sign-in.component.ts
; Author: Professor Krasso
; Date: 29. June, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: Sign-in Component
;===========================================
*/
import { Component } from '@angular/core';
import { SecurityService } from '../security.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  errMessage: string = '';
  isLoading: boolean = false;
  fieldTextType: boolean = false;

  signinForm = this.fb.group({
    email: [null, Validators.compose([Validators.required, Validators.email])],
    password: [null, Validators.compose([Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)])],
  }, { updateOn: 'submit' })

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cookieService: CookieService,
    private secService: SecurityService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.errMessage = '';
   }

  signIn() {
    // Spinner
    this.isLoading = true;

    // console.log('Signin Form', this.signinForm.value);
    //get email value from signin form
    let email = this.signinForm.controls['email'].value;
    //get password from form
    let password = this.signinForm.controls['password'].value;

    //If email and password fields empty display error message
    if (!email) {
      this.errMessage = 'Please provide your email address';
      this.isLoading = false;
      return;
    }
    if (!password) {
      this.errMessage = 'Please provide your password';
      this.isLoading = false;
      return;
    }
    //call signin function from security service
    this.secService.signIn(email, password).subscribe({
      //if successful set session_user cookie and redirect user to logged in homepage
      next: (employee: any) => {
        console.log('employee', employee);
        //create the sessionCookie object
        const sessionCookie = {
          employeeId: employee.employeeId,
          firstName: employee.firstName,
          lastName: employee.lastName,
          email: employee.email,
          phoneNumber: employee.phoneNumber,
          address: employee.address,
          isDisabled: employee.isDisabled,
          role: employee.role,
          selectedSecurityQuestions: employee.selectedSecurityQuestions
        };
        //set session user
        this.cookieService.set('session_user', JSON.stringify(sessionCookie), 1);

        // Set the employeeId in AuthService
        this.authService.setEmployeeId(employee.employeeId);

        //check if there is a return URL, if not redirect to home page
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
        //set is loading to false when logged in
        this.isLoading = false;
        //redirect user to the returnURL
        this.router.navigate([returnUrl]);
      },
      error: (err) => {
        console.log('Server error from API call', err);
        if(err.status === 400 || 401 ) {
          this.errMessage = "The email address and/or password you provided are not valid";
          this.isLoading = false;
          return
        }
        this.errMessage = "There was a problem verifying your email address, please try again or contact the system administrator";
        this.isLoading = false;
      },
    })
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}

