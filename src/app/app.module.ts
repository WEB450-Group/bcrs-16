/*
============================================
; Title:  app.module.ts
; Author: Professor Krasso
; Date: 29. June, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: App Module
;===========================================
*/

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { CookieService } from 'ngx-cookie-service';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { SliderModule } from 'primeng/slider';
import { ProgressBarModule } from 'primeng/progressbar';
import { TagModule } from 'primeng/tag';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { FaqComponent } from './faq/faq.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServiceRepairComponent } from './service-repair/service-repair.component';
import { ProfileComponent } from './profile/profile.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { EmployeeDirectoryComponent } from './employee-directory/employee-directory.component';
import { FaqDialogComponent } from './faq/faq-dialog/faq-dialog.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { SearchInvoicesComponent } from './search-invoices/search-invoices.component';
import { InvoiceDialogComponent } from './search-invoices/invoice-dialog/invoice-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    AboutComponent,
    FaqComponent,
    NotFoundComponent,
    ServiceRepairComponent,
    ProfileComponent,
    EmployeeDirectoryComponent,
    FaqDialogComponent,
    InvoiceComponent,
    SearchInvoicesComponent,
    InvoiceDialogComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    MatIconModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MatSelectModule,
    MatFormFieldModule,
    MatOptionModule,
    AppRoutingModule,
    SharedModule,
    MatInputModule,
    MatStepperModule,
    MatButtonModule,
    MatDialogModule,
    ChartModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    MultiSelectModule,
    SliderModule,
    ProgressBarModule,
    TagModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }

