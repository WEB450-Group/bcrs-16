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
        question: 'How create service request?',
        answer: `To learn how to create a service request, follow these steps:
        1. Navigate to 'Service Repair' in the Navigation bar or, when logged in, click the 'Create New Service' button on the home screen.
        2. Fill out the 'Service Request' form on the left side of the page (NOTE: Full Name, Phone Number, Email, and at least one service must be marked or the form will not submit).
        3. Click on the 'Create Service' button at the bottom of the Service Request form; all data should populate in the 'Invoice' section on the right.`
      },
      {
        question: 'How print an invoice?',
        answer: `To learn how to print an invoice, follow these steps:
        1. After creating a service request, the data should populate on the right-hand side in the 'Invoice' section.
        2. Go over the information carefully with the client and make sure fields are correct.
        3. If all fields are correct, click on the 'Print' button at the bottom of the form.
        4. Print the document and give it to the client to bring back to retrieve their order upon completion.`
      },
      {
        question: 'How to use Service Graph?',
        answer: `To learn how to use the service graph, follow these steps:
        1. Once logged in, click on your name in the top right navigation to access the dropdown menu.
        2. Click on the 'Service Graph' link.
        3. Choose either 'Pie Chart' or 'Bar Chart' to view the data in each graphical representation.`
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
