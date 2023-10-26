import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { serviceService } from '../core/service.service';


export const authGuard: CanActivateFn = (route, state) => {

  if(inject(serviceService).id_user == ''){
  inject(Router).navigate(['/']);
  }


  return inject(serviceService).logueado;
};
