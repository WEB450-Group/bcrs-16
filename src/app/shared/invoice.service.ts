/*
============================================
; Title: invoice.service.ts
; Author: Professor Krasso
; Date: 02. July, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: Invoice service
;===========================================
*/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invoice } from './invoice.interface';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient) { }

  createInvoice(invoice: Invoice) {
    return this.http.post('/api/invoices/' + invoice.employeeId, invoice);
  }

  findAllServiceRequests() {
    return this.http.get('/api/invoices/service-graph');
  }
}
