/*
============================================
; Title:  role.guard.ts
; Author: Professor Krasso
; Date: 29. June, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: Role Guard
;===========================================
*/
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core'; 
import { CookieService } from 'ngx-cookie-service';

export const roleGuard: CanActivateFn = (route, state) => {
  const cookie = inject(CookieService);
  let sessionUser = JSON.parse(cookie.get('session_user'));
  
  console.log('sessionUser', sessionUser);
  //If not logged in redirect to login
  if(!sessionUser) {
    console.log('You must be logged in to access this page!');
    const router = inject(Router);
    router.navigate(['/security/signin'], { queryParams:{ returnUrl: state.url }});
    return false;
  }
  //if not admin redirect to login
  if (sessionUser.role != 'admin') {
    console.log('You must have role of admin to view this page!');
    const router = inject(Router);
    router.navigate(['/security/signin'], { queryParams:{ returnUrl: state.url }})
    return false;
  }
  return true;
};
