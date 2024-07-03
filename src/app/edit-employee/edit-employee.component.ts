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
import { Employee } from '../employee.interface';
import { EmployeeEdit } from '../employeeEdit.interface';
import { EmployeeService } from '../employee.service';

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
  editForm: FormGroup = this.fb.group({
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
      
    })

  }

  editEmployee(employeeId: number) {

  }


}
