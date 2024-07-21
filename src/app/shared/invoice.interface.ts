/*
============================================
; Title: invoice.interface.ts
; Author: Professor Krasso
; Date: 02. July, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: Invoice interface
;===========================================
*/

interface lineItem {
    itemId: number;
    itemName: string;
    price: number;
}

export interface Invoice {
    invoiceId?: number;
    employeeId: number;
    customerEmail: string;
    phoneNumber: number;
    fullName: string;
    lineItems: Array<lineItem>
    partsAmount?: number; // Maybe provided
    laborAmount?: number; // Maybe provided
    lineItemTotal: number;
    invoiceTotal: number;
    orderDate: string;
    customOrderDescription?: string;
}