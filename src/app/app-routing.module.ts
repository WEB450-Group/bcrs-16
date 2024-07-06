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
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AboutComponent } from './about/about.component';
import { ServiceGraphComponent } from './service-graph/service-graph.component';
import { ServiceRepairComponent } from './service-repair/service-repair.component';
import { FaqComponent } from './faq/faq.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { ProfileComponent } from './profile/profile.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';

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
        path: 'service-graph',
        component: ServiceGraphComponent
      },
      {
        path: 'service-repair',
        component: ServiceRepairComponent
      },
      {
        path: 'faq',
        component: FaqComponent
      },
      {
        path: 'employee-list',
        component: EmployeeListComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'edit-employee',
        component: EditEmployeeComponent
      },
      {
        path: 'create-employee',
        component: CreateEmployeeComponent
      }
    ]
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
