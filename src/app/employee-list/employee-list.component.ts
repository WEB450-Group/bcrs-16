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
import { NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';

export interface Employee {
  employeeId: number
  firstName : string;
  lastName: string;
  emailAddress: string;
  phoneNumber: number;
  isDisabled: boolean;
  role: 'string'
}

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent {
  employeeList: Employee[];
  employee: Employee;

  constructor() {
    this.employee = {} as Employee;
    this.employeeList = [];
  }
}
