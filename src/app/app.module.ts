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
import { ReactiveFormsModule, FormsModule, FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { CookieService } from 'ngx-cookie-service';

import { roleGuard } from './shared/role.guard';
import { authGuard } from './shared/auth.guard';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BaseLayoutComponent } from './shared/layouts/base-layout/base-layout.component';
import { NavComponent } from './shared/layouts/nav/nav.component';
import { FooterComponent } from './shared/layouts/footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { FaqComponent } from './faq/faq.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServiceRepairComponent } from './service-repair/service-repair.component';
import { ProfileComponent } from './profile/profile.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    //BaseLayoutComponent,
    //NavComponent,
    //FooterComponent,
    ContactComponent,
    AboutComponent,
    FaqComponent,
    NotFoundComponent,
    ServiceRepairComponent,
    ProfileComponent,
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
    SharedModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }

