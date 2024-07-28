/*
============================================
; Title: employee.interface.ts
; Author: Professor Krasso
; Date: 02. July, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: Employee Interface
;===========================================
*/
import { selectedSecurityQuestion } from "./selectedSecurityQuestion.interface";

export interface Employee {
    employeeId: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    address: string;
    isDisabled: boolean;
    role: string;
    selectedSecurityQuestion: selectedSecurityQuestion[];
}

export interface CreateEmployee {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  role: string;
}

export interface Registration {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  isDisabled: boolean;
  role: string;
  selectedSecurityQuestions: selectedSecurityQuestion[];
}

export interface UpdateProfile {
  lastName: string;
  phoneNumber: string;
  address: string;
}