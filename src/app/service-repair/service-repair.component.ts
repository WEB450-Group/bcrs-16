/*
============================================
; Title:  service-repair.component.ts
; Author: Professor Krasso
; Date: 29. June, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: Service Repair Component
;===========================================
*/
import { Component, OnInit } from '@angular/core';
import { LineItem } from '../shared/line-item.interface';
import { Invoice } from '../shared/invoice.interface';
import { InvoiceService } from '../shared/invoice.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-service-repair',
  templateUrl: './service-repair.component.html',
  styleUrls: ['./service-repair.component.scss']
})
export class ServiceRepairComponent implements OnInit {

  //create invoice variables 
  lineItems: LineItem[];
  errMessage: string;
  isLoading: boolean;
  invoice: Invoice;
  customItem: number;
  date: string;
  tax: number;
  total: number;
  checked: boolean;

  //create form group
  serviceForm: FormGroup = this.fb.group({
    fullName: [null, Validators.required],
    phoneNumber: [null, Validators.required],
    customerEmail: [null, [Validators.required, Validators.email]],
    customOrder: [null],
    lineItems: this.fb.array([])
  }, { updateOn: 'blur' });
  
  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private invoiceService: InvoiceService,
    private cookieService: CookieService,
    private cdr: ChangeDetectorRef
  ) {
    //initialize variables
    this.errMessage = '';
    this.isLoading = false;
    this.lineItems = [];
    this.customItem = 0;
    this.invoice = {} as Invoice;
    this.tax = 0.09;
    this.total = 0;
    this.checked = false; 

    this.date = new Date().toLocaleDateString()

    
  }

  ngOnInit() {
    // initialize the line items 
    this.lineItems = [
      { itemId: 1, itemName: 'Password Reset', price: 39.99, checked: false },
      { itemId: 2, itemName: 'Spyware Removal', price: 99.99, checked: false },
      { itemId: 3, itemName: 'RAM Upgrade', price: 129.99, checked: false },
      { itemId: 4, itemName: 'Software Installation', price: 49.99, checked: false },
      { itemId: 5, itemName: 'PC Tune-up', price: 89.99, checked: false },
      { itemId: 6, itemName: 'Keyboard Cleaning', price: 45.00, checked: false },
      { itemId: 7, itemName: 'Disk Clean-up', price: 129.99, checked: false }
    ];

  }

  //calculate the total invoice amount
  private calculateTotal(): number {
    const partsAmount = 0;
    const laborAmount = this.customItem * 50;
    const lineItemTotal = this.calculateLineItems(this.lineItems);
    const tax = (laborAmount + lineItemTotal) * this.tax;
    return partsAmount + laborAmount + lineItemTotal + tax;
  }

  // calculate the total price of checked line items
  private calculateLineItems(lineItems: LineItem[]): number {
    let total = 0;
    for (let i = 0; i < lineItems.length; i++) {
      if (lineItems[i].checked) {
        total += lineItems[i].price;
      }
    }
    return total;
  }
  
  //printer function for invoices 
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
  
    
  //create invoice
  createInvoice() {
    this.isLoading = true;

    //check if at least one item is checked or a custom item is provided
    const isAnyItemChecked = this.lineItems.some(item => item.checked);
    const isCustomItemProvided = !!this.customItem;
    
    if (!isAnyItemChecked && !isCustomItemProvided) {
      //error message if not items or labor checked
      this.errMessage = 'Please select at least one service or provide a custom order.';
      this.isLoading = false;
      return;
    }
    // Get session user employee ID for invoice 
    const sessionUserString = this.cookieService.get('session_user');
    const sessionUser = JSON.parse(sessionUserString); 
    const employeeId = sessionUser.employeeId;

    // Create invoice 
    this.invoice = {
      employeeId: parseInt(employeeId, 10),
      fullName: this.serviceForm.get('fullName')?.value,
      phoneNumber: this.serviceForm.get('phoneNumber')?.value,
      customerEmail: this.serviceForm.get('customerEmail')?.value,
      lineItems: this.lineItems.filter(item => item.checked),
      partsAmount: 0,
      laborAmount: this.customItem * 50,
      lineItemTotal: this.calculateLineItems(this.lineItems),
      invoiceTotal: parseFloat(this.calculateTotal().toFixed(2)),
      orderDate: this.date,
      customOrderDescription: this.serviceForm.get('customOrder')?.value 
    }

    console.log('Invoice', this.invoice);

    // send the invoice to the server
    this.invoiceService.createInvoice(this.invoice).subscribe({
      next: (response) => {
        console.log('Result from register API call', response);
        this.isLoading = false;
      },
      error: (err) => {
        if (err.error && err.error.message) {
          console.log('Database Error', err.error.message);
          this.errMessage = err.error.message;
        } else {
            this.errMessage = "Something went wrong, please contact the system administrator";
             console.log(this.errMessage);
          }
          this.isLoading = false;
          return;
      }
    });
  }
}
