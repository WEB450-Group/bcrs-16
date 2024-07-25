/*
============================================
; Title:  invoice-dialog.component.ts
; Author: Professor Krasso
; Date: 29. June, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: Invoice Dialog Component
;===========================================
*/
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

interface InvoiceData {
  invoiceId: string;
  orderDate: string;
  fullName: string;
  phoneNumber: string;
  customerEmail: string;
  lineItems: { itemName: string, price: number }[];
  laborAmount: number;
  customOrderDescription: string;
  lineItemTotal: number;
  invoiceTotal: number;
}

@Component({
  selector: 'app-invoice-dialog',
  templateUrl: './invoice-dialog.component.html',
  styleUrls: ['./invoice-dialog.component.scss']
})
export class InvoiceDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: InvoiceData) { }

  printInvoice() {
    const printArea = document.getElementById('printArea');
    if (printArea) {
      const printWindow = window.open('', '_blank', 'width=800,height=600');
      printWindow?.document.open();
      printWindow?.document.write(`
          <html>
            <head>
              <title>Print Invoice</title>
              <style>
                @media print {
                  body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                  }
                  .print-area {
                    padding: 2rem;
                  }
                  .print-area img {
                    display: block;
                    margin: 0 auto;
                  }
                  .print-area h2 {
                    margin-top: 2rem;
                    color: rgb(34, 77, 49);
                    font-size: 2.25rem;
                    font-weight: 300;
                    font-family: "Inter var", sans-serif;
                  }
                  .print-area div.flex {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 10px;
                  }
                  .print-area label {
                    font-weight: bold;
                    text-align: left;
                    flex-basis: 30%;
                  }
                  .print-area p,
                  .print-area ul {
                    text-align: right;
                    flex-basis: 70%;
                    margin: 0;
                  }
                  .print-area ul {
                    list-style-type: none;
                  }
                }
              </style>
            </head>
            <body>
              <div class="print-area">
                ${printArea.innerHTML}
              </div>
            </body>
          </html>
          `);
      printWindow?.document.close();
      printWindow?.print();
      printWindow?.close();
    }
  }
}
