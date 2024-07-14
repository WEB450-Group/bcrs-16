/*
============================================
; Title:  registration.component.ts
; Author: Professor Krasso
; Date: 29. June, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: Registration Component
;===========================================
*/
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { SecurityService } from '../security.service';
import { Registration } from 'src/app/shared/employee.interface';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  //stepper valiables
  isLinear = false;

  errMessage: string;
  isLoading: boolean;

  //variable for hide/show password
  fieldTextType: boolean = false;

  //security question variables
  securityQuestions: string[]
  qArray1: string[];
  qArray2: string[];
  qArray3: string[];

  //employee variable
  employee: Registration;

  //Stepper form group assignments and validators
  firstFormGroup: FormGroup = this._formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null,[Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)], [this.asyncPasswordValidator.bind(this)]]
  });
  secondFormGroup: FormGroup = this._formBuilder.group({
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    phoneNumber: [null, Validators.required],
    address: [null, Validators.required]
  });
  thirdFormGroup: FormGroup = this._formBuilder.group({
    question1: [null, Validators.required],
    answer1: [null, Validators.required],
    question2: [null, Validators.required],
    answer2: [null, Validators.required],
    question3: [null, Validators.required],
    answer3: [null, Validators.required]
  });

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private securityService: SecurityService)
  {
    this.errMessage = '';
    this.isLoading = false;

    //Save to database and query with an API?
    //Security questions array
    this.securityQuestions = [
      "What City was your mom born in?",
      "What is the name of your best friend growing up?",
      "What was your favorite childhood teacher's name?",
      "What Street did you grow up on?"
    ];

    //Initializes first questions array to the securityQuestions array
    this.qArray1 = this.securityQuestions;
    //Initializes second questions array to an empty array
    this.qArray2 = [];
    //Initializes third questions array to an empty array
    this.qArray3 = [];

    //Initialize employee object to Employee Interface
    this.employee = {} as Registration;

  }
  //Cascading for dropdown menus
  ngOnInit(): void {
    //subscribe to the value changes oof the security question 1
    this.thirdFormGroup.get('question1')?.valueChanges.subscribe( val => {
      console.log('Value changed from question 1', val);
      //filter the second array of questions to remove the selected question
      this.qArray2 = this.qArray1.filter(q => q !== val )
    });
    //subscribe to the value changes oof the security question 2
    this.thirdFormGroup.get('question2')?.valueChanges.subscribe( val => {
      console.log('Value changed from question 2', val);
      //filter the third array of questions to remove the selected question
      this.qArray3 = this.qArray2.filter(q => q !== val )
    });
  }

  //Registers new user and redirects them to login page
  register() {
    //if form is invalid call markAsTouched and errors where they occurred
    // if (!this.firstFormGroup.valid || !this.secondFormGroup.valid || !this.thirdFormGroup.valid) {
    //   this.markAllAsTouched();
    //   this.errMessage = 'Please complete required fields';
    //   return;
    // }

    this.errMessage = '';
    this.isLoading = true;

    this.employee = {
      email: this.firstFormGroup.get('email')?.value,
      password: this.firstFormGroup.get('password')?.value,
      firstName: this.secondFormGroup.get('firstName')?.value,
      lastName: this.secondFormGroup.get('lastName')?.value,
      phoneNumber: this.secondFormGroup.get('phoneNumber')?.value,
      address: this.secondFormGroup.get('address')?.value,
      selectedSecurityQuestions: [
        {
          question: this.thirdFormGroup.get('question1')?.value,
          answer: this.thirdFormGroup.get('answer1')?.value,
        },
        {
          question: this.thirdFormGroup.get('question2')?.value,
          answer: this.thirdFormGroup.get('answer2')?.value,
        },
        {
          question: this.thirdFormGroup.get('question3')?.value,
          answer: this.thirdFormGroup.get('answer3')?.value,
        }
      ],
      role: 'standard',
      isDisabled: false
    };
    //This is the last log
    console.log("Registering new user", this.employee);
    //subscribe to register API call result
    this.securityService.register(this.employee).subscribe({
      next: (result) => {
        console.log('Result from register API call', result);
        //after successful registration, redirect the user to the signin page
        this.router.navigate(['/security/signin']);
      },
      //Error handling for database issues
      error: (err) => {
        if (err.error && err.error.message) {
          console.log('Database Error', err.error.message);
          this.errMessage = err.error.message;
        } else {
          this.errMessage = "Something went wrong, please contact the system administrator";
          console.log(this.errMessage);
        }
      }
    });

  }
  //Marks the control and all its descendant controls as touched
  //on submit if fields left empty global error occurs and error messages for empty fields pop up
  markAllAsTouched() {
    this.firstFormGroup.markAllAsTouched();
    this.secondFormGroup.markAllAsTouched();
    this.thirdFormGroup.markAllAsTouched();
  }
  //Toggle show/hide password
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  asyncPasswordValidator(control: AbstractControl): Observable<{ [key: string]: any } | null> {
    // Return a new Observable
    return new Observable(observer => {
      // Simulate an async operation with a 1-second delay
      setTimeout(() => {
        // Validation logic
        const valid = control.value !== 'invalid';
        // Emit validation result
        observer.next(valid ? null : { 'asyncInvalid': true });
        // Signal that the observable is complete
        observer.complete();
      }, 1000);
    });
  }
}
