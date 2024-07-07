/*
============================================
; Title: edit-employee.component.ts
; Author: Professor Krasso
; Date: 03. July, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: Employee Edit Component
;===========================================
*/

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../shared/employee.interface';
import { EmployeeEdit } from '../../shared/employeeEdit.interface';
import { EmployeeService } from '../../shared/employee.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent {
  // Local variables
  employeeId: number;
  employee: Employee;
  successfulMessage: string;
  errorMessage: string;
  isLoading: boolean = false;

  // Initialize the form
  editEmployeeForm: FormGroup = this.fb.group({
    role: [null, Validators.compose([Validators.required])],
    isDisabled: [null, Validators.compose([Validators.required])]
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private employeeService: EmployeeService) {
    // Assign local variables
    let l_employeeID = this.route.snapshot.paramMap.get('employeeId') || ''; // Get the employeeId from the route
    this.employeeId = parseInt(l_employeeID, 10);
    this.employee = {} as Employee;
    this.successfulMessage = '';
    this.errorMessage = '';

    // If the employeeId is not a number; then just navigate the user back to the employee list
    if(isNaN(this.employeeId)) {
      this.router.navigate(['/employee-list']);
    }

    // Get the employee information by calling the findEmployeeByID function and subscribing to it
    this.employeeService.findEmployeeById(this.employeeId).subscribe({
       next: (employee: any) => {
        console.log(employee);
        // Set the employee found by the ID
        this.employee = employee;
        // Set the default values of the edit employee form
        this.editEmployeeForm.patchValue({
          role: this.employee.role,
          isDisabled: this.employee.isDisabled ? 'true' : 'false'
        });
       },
       error: (err) => {
        console.error(err);
        // Write the error message
        this.errorMessage = `Cannot find employee with ID ${this.employeeId}`;
       }
    });

  }

  editEmployee() {
    this.isLoading = true;

    // Create an employee edit object
    let editEmployee = {} as EmployeeEdit;
    // Set the edit employee values to the ones on the form
    editEmployee.role = this.editEmployeeForm.controls['role'].value;
    editEmployee.isDisabled = this.stringToBoolean(this.editEmployeeForm.controls['isDisabled'].value);

    // Call the updateEmployee API and pass in the employeeID and the new information from the employee
    this.employeeService.updateEmployeeById(this.employeeId, editEmployee).subscribe({
      next: (result: any) => {
        console.log(result);
        // If the result is successful then navigate the user back to the employee list
        this.router.navigate(['/admin/employees']);
      },
      error: (err) => {
        console.log(err);
        // Write the error message
        this.errorMessage = 'Failed to update employee information.';
      }
    })
  }

  stringToBoolean(str: string): boolean {
    return str.toLowerCase() === 'true';
  }
}
