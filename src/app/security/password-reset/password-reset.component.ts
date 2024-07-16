/*
============================================
; Title:  password-reset.component.ts
; Author: Professor Krasso
; Date: 7. July, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: Reset password Component
;===========================================
*/
import { Component } from '@angular/core';
import { SecurityService } from '../security.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent {
  // Local variables
  email: string;
  errorMessage: string;
  isLoading: boolean = false;
  fieldTextType: boolean = false;

  // Initialize the resetPasswordForm
  resetPasswordForm: FormGroup = this.fb.group({
    password: [null, Validators.compose([Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)])]
  })

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private securityService: SecurityService) {
      // Assign local variables
      this.email = this.route.snapshot.queryParamMap.get('email') ?? '';
      this.errorMessage = '';

      // If the email is not found; the navigate them back to the sign in page
      if(!this.email) {
        console.error('No email found');
        this.router.navigate(['/security/signin']);
      }
  }

  resetPassword() {
    this.isLoading = true;

    // Get the password from the form
    const password = this.resetPasswordForm.controls['password'].value;

    // Call the security service to get the reset password API call and pass in the email and new password
    this.securityService.resetPassword(this.email, password).subscribe({
      next: (result) => {
        console.log(result);
        this.router.navigate(['/security/signin']);
      },
      error: (err) => {
        console.error('Error changing password: ', err.error.message);
        this.errorMessage = err;
        this.isLoading = false;
      },
      complete: () => {
        alert("Password reset successful!")
      }
    })
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
