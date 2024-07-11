/*
============================================
; Title:  security-routing.module.ts
; Author: Professor Krasso
; Date: 29. June, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: Security Routing Module
;===========================================
*/

// imports statements
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecurityComponent } from './security.component';
import { SigninComponent } from './signin/signin.component';
import { RegistrationComponent } from './registration/registration.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { VerifyQuestionsComponent } from './verify-questions/verify-questions.component';

const routes: Routes = [
  {
    path: '',
    component: SecurityComponent,
    title: 'BCRS: Security',
    children: [
      {
        path: 'signin',
        component: SigninComponent,
        title: 'BCRS: Login'

      },
      {
        path: 'registration',
        component: RegistrationComponent,
        title: 'BCRS: Registration'

      },
      {
        path: 'verify-email',
        component: VerifyEmailComponent,
        title: 'BCRS: Verify Email'
      },
      {
        path: 'password-reset',
        component: PasswordResetComponent,
        title: 'BCRS: Password Reset'
      },
      {
        path: 'verify-questions',
        component: VerifyQuestionsComponent,
        title: 'BCRS: Verify Security Questions'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
