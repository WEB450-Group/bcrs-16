/*
============================================
; Title:  auth.guard.ts
; Author: Professor Krasso
; Date: 29. June, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: Auth Guard
;===========================================
*/
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const authGuard: CanActivateFn = (route, state) => {
  const cookie = inject(CookieService);

  if(cookie.get('session_user')) {
    console.log('User is signed in');
    return true;
  } else {
    console.log('User is not signed in');
    const router = inject(Router);
    router.navigate(['/security/signin'], { queryParams: { returnUrl: state.url }});
    return false;
  }
};
