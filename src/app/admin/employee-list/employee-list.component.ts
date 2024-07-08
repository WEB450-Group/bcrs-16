/*
============================================
; Title:  employee-list.component.ts
; Author: Professor Krasso
; Date: 29. June, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: Employee list Component
;===========================================
*/
import { Component } from '@angular/core';
import { EmployeeService } from '../../shared/employee.service';
import { Employee } from '../../shared/employee.interface';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent {
  //definitions
  employees: Employee[];
  errorMessage: '';
  isLoading: boolean;

  constructor(private employeeService: EmployeeService) {
    //initialize variables
    this.employees = [];
    this.errorMessage = "";
    this.isLoading = true;

    // inject employee service and subscribe to employee API
    this.employeeService.findAllEmployees().subscribe({
      //when data fetched assign employee data from database to employee property
      next: (employees: any) => {
        this.employees = employees
      },
      // if data cannot be fetch console error message
      error: (err) => {
      this.errorMessage = err.message;
      console.log(err);
      },
      //when data is fetched, assigned, and showing on UI, set isLoading (SVG) to false
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
