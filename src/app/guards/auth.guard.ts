import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { EjemploService } from '../core/ejemplo.service';


export const authGuard: CanActivateFn = (route, state) => {
  alert(inject(EjemploService).logueado);

  if(!inject(EjemploService).logueado){
  inject(Router).navigate(['/home']);
  }


  return inject(EjemploService).logueado;
};
