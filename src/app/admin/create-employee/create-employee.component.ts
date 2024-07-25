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
import { CreateEmployee, Employee } from '../../shared/employee.interface';
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
    firstName: [null, Validators.compose([Validators.required])],
    lastName: [null, Validators.compose([Validators.required])],
    email: [null, Validators.compose([Validators.required])],
    phoneNumber: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]{10}$')])],
    address: [null, Validators.compose([Validators.required])],
    role: [null, Validators.compose([Validators.required])],
  });


  constructor(private fb: FormBuilder, private router: Router, private employeeService: EmployeeService) {
    // Assigning local variables
    this.errorMessage = '';
    this.showAnswerField = false;
    this.isLoading = false;
  }

  // Function to create employee
  createEmployee() {

    this.isLoading = true;

    // Creating the new employee with the form values
    const employee: CreateEmployee = {
      firstName: this.employeeForm.controls['firstName'].value,
      lastName: this.employeeForm.controls['lastName'].value,
      email: this.employeeForm.controls['email'].value,
      phoneNumber: parseInt(this.employeeForm.controls['phoneNumber'].value, 10),
      address: this.employeeForm.controls['address'].value,
      role: this.employeeForm.controls['role'].value,
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
        alert('User created successfully!')
        this.router.navigate(['/admin/employees']);
      }
    })
  }
}
