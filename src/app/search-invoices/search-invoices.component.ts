/*
============================================
; Title:  search-invoice.component.ts
; Author: Professor Krasso
; Date: 29. June, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: Search Invoice Component
;===========================================
*/

import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../shared/invoice.service';
import { InvoiceDialogComponent } from './invoice-dialog/invoice-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Invoice } from '../shared/order';

@Component({
  selector: 'app-search-invoices',
  templateUrl: './search-invoices.component.html',
  styleUrls: ['./search-invoices.component.scss']
})
export class SearchInvoicesComponent implements OnInit {
  invoices: any[] = [];
  loading: boolean = true;

  constructor(private invoiceService: InvoiceService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadInvoices();
  }

  loadInvoices(): void {
    this.invoiceService.getInvoices().subscribe({
      next: (data) => {
        this.invoices = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading invoices:', err);
        this.loading = false;
      }
    });
  }

  clear(dt: any): void {
    dt.clear();
  }

  applyFilter(event: Event, dt: any) {
    const input = event.target as HTMLInputElement;
    dt.filterGlobal(input.value, 'contains');
  }

  getSeverity(status: string): string {
    switch (status) {
      case 'Completed':
        return 'success';
      case 'Pending':
        return 'warning';
      case 'Cancelled':
        return 'danger';
      default:
        return 'info';
    }
  }

  openDialog(invoice: Invoice) {
    console.log('Invoice data:', invoice)
    this.dialog.open(InvoiceDialogComponent, {
      data: invoice,
      width: '100%',
      maxWidth: '800px'
    })
  }
}
