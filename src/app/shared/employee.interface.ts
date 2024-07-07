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
    emailAddress: string;
    password: string;
    phoneNumber: number;
    address: string;
    isDisabled: boolean;
    role: string;
    selectedSecurityQuestion: selectedSecurityQuestion;
}