/*
============================================
; Title:  registration.component.ts
; Author: Professor Krasso
; Date: 29. June, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: Registration Component
;===========================================
*/
import { Component } from '@angular/core';

//interface/model
export interface SessionUser {
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

    errMessage: string = '';
    sessionUser: SessionUser;
    isLoading: boolean = false;
  
  
    constructor() {
      this.errMessage = "";
      this.sessionUser = {} as SessionUser;
    }
  
      //UI submit button registration function
      register() {
        //for status wheel/spinner 
        this.isLoading = true;
  
        //code
      }
}
