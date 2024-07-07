/*
============================================
; Title: create-employee.component.ts
; Author: Professor Krasso
; Date: 03. July, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: Create Employee Component
;===========================================
*/
import { Component } from '@angular/core';
import { Employee } from '../../shared/employee.interface';
import { EmployeeService } from '../../shared/employee.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent {

  //local variables
  errorMessage: string;
  showAnswerField: boolean;
  isLoading: boolean;

  // Creating and assigning employee form
  employeeForm: FormGroup = this.fb.group({
    employeeId: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]{4}$')])],
    firstName: [null, Validators.compose([Validators.required])],
    lastName: [null, Validators.compose([Validators.required])],
    phoneNumber: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]{10}$')])],
    emailAddress: [null, Validators.compose([Validators.required])],
    password: [null, Validators.compose([Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])')])],
    address: [null, Validators.compose([Validators.required])],
    role: [null, Validators.compose([Validators.required])],
    isDisabled: [null, Validators.compose([Validators.required])],
    selectedSecurityQuestion: [null, Validators.compose([Validators.required])],
    answer: [null, Validators.compose([Validators.required])]
  });


  constructor(private fb: FormBuilder, private router: Router, private employeeService: EmployeeService) {
    // Assigning local variables
    this.errorMessage = '';
    this.showAnswerField = false;
    this.isLoading = false;
  }

  // Function to create employee
  createEmployee() {

    const employeeId = parseInt(this.employeeForm.controls['employeeId'].value, 10);
    const phoneNumber = parseInt(this.employeeForm.controls['phoneNumber'].value, 10);
    const isDisabled = this.stringToBoolean(this.employeeForm.controls['isDisabled'].value);

    const selectedSecurityQuestion = {
      question: this.employeeForm.controls['selectedSecurityQuestion'].value,
      answer: this.employeeForm.controls['answer'].value
    };

    this.isLoading = true;

    // Creating the new employee with the form values
    const employee: Employee = {
      employeeId: employeeId,
      firstName: this.employeeForm.controls['firstName'].value,
      lastName: this.employeeForm.controls['lastName'].value,
      emailAddress: this.employeeForm.controls['emailAddress'].value,
      phoneNumber: phoneNumber,
      password: this.employeeForm.controls['password'].value,
      address: this.employeeForm.controls['address'].value,
      role: this.employeeForm.controls['role'].value,
      isDisabled: isDisabled,
      selectedSecurityQuestion: selectedSecurityQuestion
    };

    // Calling the createNewEmployee API passing in the employee created
    this.employeeService.createNewEmployee(employee).subscribe({
      next: (result: any) => {
        console.log(result);
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = 'Error occurred while creating the employee!';
        this.isLoading = false;
      },
      complete: () => {
        this.router.navigate(['/admin/employees']);
      }
    })
  }

  onSelectedQuestion() {
    const selectedQuestion = this.employeeForm.controls['selectedSecurityQuestion']?.value;
    this.showAnswerField = !!selectedQuestion && selectedQuestion !== '0';
    console.log(this.showAnswerField);
  }

  stringToBoolean(str: string): boolean {
    return str.toLowerCase() === 'true';
  }
}
