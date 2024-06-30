/*
============================================
; Title:  sign-in.component.ts
; Author: Professor Krasso
; Date: 29. June, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: Sign-in Component
;===========================================
*/
import { Component } from '@angular/core';

//interface/model
export interface SessionUser {

}

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  errMessage: string = '';
  sessionUser: SessionUser;
  isLoading: boolean = false;


  constructor() {
    this.errMessage = "";
    this.sessionUser = {} as SessionUser;
  }

    //UI submit button sign in function
    signin() {
      //for status wheel/spinner 
      this.isLoading = true;

      //code
    }
}
