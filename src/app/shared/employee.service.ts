/*
============================================
; Title: employee.service.ts
; Author: Professor Krasso
; Date: 02. July, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: Employee service
;===========================================
*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateEmployee, UpdateProfile } from './employee.interface';
import { EmployeeEdit } from './employeeEdit.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  // Find all employees
  findAllEmployees() {
    return this.http.get('/api/employees');
  }

  // Find employee by employee ID
  findEmployeeById(employeeId: number) {
    return this.http.get('/api/employees/' + employeeId);
  }

  // Create new employee
  createNewEmployee(employee: CreateEmployee) {
    return this.http.post('/api/employees', employee);
  }

  // Update employee by employee ID
  updateEmployeeById(employeeId: number, employee: EmployeeEdit) {
    return this.http.put('/api/employees/' + employeeId, employee);
  }

  // Find Selected Security Questions
  findSecurityQuestions(email: string): Observable<any> {
    return this.http.get(`/api/employees/${email}/security-questions`);
  }

  updateProfile(employeeId: number, employee: UpdateProfile): Observable<any> {
    return this.http.post('/api/employees/profile/' + employeeId, employee);
  }
}
