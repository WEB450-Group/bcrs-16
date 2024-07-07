/*
============================================
; Title:  admin.component.ts
; Author: Professor Krasso
; Date: 29. June, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: Admin Component
;===========================================
*/
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
    // router outlet for the admin module
    template: `
    <!-- <app-nav></app-nav> -->
      <router-outlet></router-outlet>
    <!-- <app-footer></app-footer> -->
    `,
    styles: [
    ]
})
export class AdminComponent {
}
