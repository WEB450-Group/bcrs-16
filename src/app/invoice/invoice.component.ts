// InvoiceComponent
import { Component, Input } from '@angular/core';
import { Invoice } from '../shared/invoice.interface';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent {
  @Input() invoice: Invoice | null = null;

}
