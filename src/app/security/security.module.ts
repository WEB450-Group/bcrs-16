/*
============================================
; Title:  security.module.ts
; Author: Professor Krasso
; Date: 29. June, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: Security Module
;===========================================
*/

// import statements
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { ChartModule } from 'primeng/chart';

import { SecurityRoutingModule } from './security-routing.module';
import { SecurityComponent } from './security.component';
import { SigninComponent } from './signin/signin.component';
import { RegistrationComponent } from './registration/registration.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { VerifyQuestionsComponent } from './verify-questions/verify-questions.component';

@NgModule({
  declarations: [
    SecurityComponent,
    SigninComponent,
    RegistrationComponent,
    PasswordResetComponent,
    VerifyEmailComponent,
    VerifyQuestionsComponent
  ],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MatInputModule,
    MatStepperModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatFormFieldModule,
    MatOptionModule,
    ChartModule
  ]
})
export class SecurityModule { }
