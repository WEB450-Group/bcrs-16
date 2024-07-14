/*
============================================
; Title:  faq.component.ts
; Author: Professor Krasso
; Date: 29. June, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: FAQ Component
;===========================================
*/
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FaqDialogComponent } from './faq-dialog/faq-dialog.component';
import { Faq } from './faq.interface';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent {

  // Local variables
  faqs: Faq[];

  constructor(public dialog: MatDialog) {
    // Initialize the FAQs array
    this.faqs =  [
      {
        question: 'How to reset your password?',
        answer: `To reset your password, follow this steps:
        1. Navigate to the login page by clicking 'Log in' in the top right of the home page.
        2. Click on 'Forgot Password'.
        3. Enter your registered email address.
        4. Answer the security questions.
        5. Enter your new password.`
      },
      {
        question: 'How to register an account?',
        answer: `To register an account, follow this steps:
        1. Navigate to the registration page by clicking 'Register' in the top right of the home page.
        2. Follow the steps to create an account.`
      },
      {
        question: 'How to know who are your coworkers?',
        answer: `To know who your coworkers are, follow this steps:
        1. Navigate to the login page by clicking 'Log in' in the top right of the home page.
        2. Login with your email and password.
        3. Once logged in, on the top right of the page you will see your name. Click on it.
        4. Click on 'Employee Directory'.`
      },
      {
        question: 'How to know information about our location?',
        answer: `To know information about our location, follow these steps:
        1. Navigate to the about page by clicking 'About' in the top right of the home page.`
      },
    ];
  }

  openDialog(faq: Faq) {
    // Open the dialog with the FAQ data
    this.dialog.open(FaqDialogComponent, {
      data: faq
    })
  }
}
