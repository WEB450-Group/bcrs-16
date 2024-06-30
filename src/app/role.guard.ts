/*
============================================
; Title:  role.guard.ts
; Author: Professor Krasso
; Date: 29. June, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: Role Guard
;===========================================
*/
import { CanActivateFn } from '@angular/router';

export const roleGuard: CanActivateFn = (route, state) => {
  return true;
};
