/*
============================================
; Title:  verify-questions.component.ts
; Author: Professor Krasso
; Date: 11. July, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: Verify Security Questions Component
;===========================================
*/
import { Component } from '@angular/core';
import { SecurityService } from '../security.service';
import { EmployeeService } from 'src/app/shared/employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { selectedSecurityQuestion } from 'src/app/shared/selectedSecurityQuestion.interface';

@Component({
  selector: 'app-verify-questions',
  templateUrl: './verify-questions.component.html',
  styleUrls: ['./verify-questions.component.scss']
})
export class VerifyQuestionsComponent {
  errMessage: string = '';
  isLoadingQuestions: boolean = true;
  isLoadingSubmit: boolean = false;
  // Array that holds selected security questions
  selectedSecurityQuestions: selectedSecurityQuestion[] = [];

  email: string;
  question1: string;
  question2: string;
  question3: string;

  //Form group for security question input answers
  sqForm: FormGroup = this.fb.group({
    answer1: [null, Validators.compose([Validators.required])],
    answer2: [null, Validators.compose([Validators.required])],
    answer3: [null, Validators.compose([Validators.required])]
  });

  constructor(
     private route: ActivatedRoute,
     private fb: FormBuilder,
     private securityService: SecurityService,
     private employeeService: EmployeeService,
     private router: Router )
    {
    //initialize variables
    this.errMessage = '';
    this.selectedSecurityQuestions = [];
    this.question1 = '';
    this.question2 = '';
    this.question3 = '';
    //get email from query string
    this.email = this.route.snapshot.queryParamMap.get('email') ?? '';
    console.log("Email: ", this.email);

    //if no email address is found redirect back to the verify-email page
    if(!this.email) {
      this.router.navigate(['/security/verify-email']);
      return
    }
    //subscribe to findSelectedSecurityQuestions API and retrieve users security questions
    this.employeeService.findSecurityQuestions(this.email).subscribe({
      next: (data: any) => {
        //assign the data to the selectedSecurityQuestions array
        this.selectedSecurityQuestions = data;
        console.log("Users retrieved questions", this.selectedSecurityQuestions);
      },
      error: (err) => {
        console.log("Server error from findSecurityQuestions call");
        //if error status 404, email not found
        if(err.status === 404) {
          this.errMessage = "Email does not match any in our records";
          return
        //if not 404, send server error
        } else {
          this.errMessage = "There was a problem verifying your security questions, please try again"
        }
        this.isLoadingQuestions = false;
      },
      //assign questions to question variables
      complete: () => {
        this.question1 = this.selectedSecurityQuestions[0].question;
        this.question2 = this.selectedSecurityQuestions[1].question;
        this.question3 = this.selectedSecurityQuestions[2].question;

        this.isLoadingQuestions = false;
      }
    });
  }

  submit() {
    //if form is invalid call markAsTouched and errors where they occured
    if (this.sqForm.invalid) {
      this.sqForm.markAllAsTouched();
      this.errMessage = 'Please complete required fields';
      return;
    }
    this.isLoadingSubmit = true;
    //log entered values
    console.log(this.sqForm.value);

    const email = this.email;

    //create array and assign input to it to compare
    let securityQuestions = [
      {
        question: this.question1,
        answer: this.sqForm.controls['answer1'].value
      },
      {
        question: this.question2,
        answer: this.sqForm.controls['answer2'].value
      },
      {
        question: this.question3,
        answer: this.sqForm.controls['answer3'].value
      },
    ]
    //log user input
    console.log('Provided security questions', securityQuestions)

    //subscribe to verifySecurityQuestions API to compare input answers with saved data
    this.securityService.verifySecurityQuestions(this.email, securityQuestions).subscribe({
      next: (res: any) => {
        console.log('Response from submit call', res);
        //if answers match navigate to re-wet password page
        this.router.navigate(['/security/password-reset'], {queryParams: {email}, skipLocationChange: true});
      },
      error: (err: any) => {
        //if error, log error
        if (err.error.message) {
          this.errMessage = err.error.message;
          console.log('Server error from submit call', err.error.message);
          this.isLoadingSubmit = false;
          return
        } else {
          console.error('Server Error from submit call', err);
          this.errMessage = "There was a problem verifying your security question, Please try again";
          this.isLoadingSubmit = false;
        }
      },
      complete: () => {
        this.isLoadingSubmit = false;
      }
    })
  }


}
