/*
============================================
; Title:  app.routes.ts
; Author: Professor Krasso
; Date: 29. June, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: App Routes
;===========================================
*/

// imports statements
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseLayoutComponent } from './shared/layouts/base-layout/base-layout.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AboutComponent } from './about/about.component';
import { ServiceRepairComponent } from './service-repair/service-repair.component';
import { FaqComponent } from './faq/faq.component';
import { ProfileComponent } from './profile/profile.component';
import { EmployeeDirectoryComponent } from './employee-directory/employee-directory.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { SearchInvoicesComponent } from './search-invoices/search-invoices.component';

// routes array with a path, component, and title for each route in the application (e.g. home, about, contact, etc.)
export const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        title: "Bob's Computer repair shop: Home"
      },
      {
        path: 'home',
        component: HomeComponent,
        title: "Bob's Computer repair shop: Home"
      },
      {
        path: 'contact',
        component: ContactComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'service-repair',
        component: ServiceRepairComponent,
      },
      {
        path: 'search-invoices',
        component: SearchInvoicesComponent,
      },
      {
        path: 'invoice',
        component: InvoiceComponent
      },
      {
        path: 'faq',
        component: FaqComponent
      },
      {
        path: 'profile/:employeeId',
        component: ProfileComponent
      },
      {
        path: 'employee-directory',
        component: EmployeeDirectoryComponent
      }
    ]
  },
  {
    // path for the admin module (e.g. employee-list , create-user, service-graph, etc.)
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    // path for the security module (e.g. login, register, forgot password, etc.)
    path: 'security',
    loadChildren: () => import('./security/security.module').then(m => m.SecurityModule)
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];

@NgModule({
  // imports the RouterModule and defines the routes array and other options (e.g. useHash, enableTracing, scrollPositionRestoration)
  imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: false, scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
