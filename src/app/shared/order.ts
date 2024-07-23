/*
============================================
; Title:  order.ts
; Author: Professor Krasso
; Date: 20. July, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: Order class
;===========================================
*/

import { LineItem } from './line-item.interface';

export class Invoice {
  employeeId?: number;
  fullName: string;
  phoneNumber: string;
  customerEmail: string;
  lineItems: Array<LineItem>;
  partsAmount?: number;
  laborAmount: number;
  lineItemTotal: number;
  invoiceTotal: number;
  tax: number = 0.09; 

  constructor() {
    this.employeeId = 0;
    this.fullName = '';
    this.phoneNumber = '';
    this.customerEmail = '';
    this.lineItems = []; 
    this.partsAmount = 0; 
    this.laborAmount = 0; 
    this.lineItemTotal = 0; 
    this.invoiceTotal = 0;
  }

  // Calculate the total amount for line items
  calculateLineItemsTotal(): number {
    let total = 0;
    for (let item of this.lineItems) {
      if (item.checked) {
        total += item.price;
      }
    }
    return total;
  }

  // Calculate the total amount for the invoice
  calculateTotal(): number {
    this.lineItemTotal = this.calculateLineItemsTotal();
    const taxAmount = (this.laborAmount + this.lineItemTotal) * this.tax;
    this.invoiceTotal = this.laborAmount + this.lineItemTotal + taxAmount;
    return parseFloat(this.invoiceTotal.toFixed(2));
  }
}
