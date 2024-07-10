/*
============================================
; Title:  security.service.ts
; Author: Professor Krasso
; Date: 5. July, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: Security Service
;===========================================
*/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private http: HttpClient) {}
  // findById API call
  findEmployeeById(employeeId: number) {
    return this.http.get(`/api/employees/${employeeId}`);
  }

  // Signin API call
  signIn(email: string, password: string) {
    return this.http.post('/api/security/signin', {
      email: email, password: password
    });
  }

  // Reset password API call
  resetPassword(email: string, password: string) {
    return this.http.post('/api/security/employees/' + email + '/reset-password', password);
  }
}