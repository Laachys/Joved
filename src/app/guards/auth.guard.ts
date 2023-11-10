import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { serviceService } from '../core/service.service';
import { CookieService } from 'ngx-cookie-service';


export const authGuard: CanActivateFn = (route, state) => {

  if(inject(CookieService).get('Id_user') == '' ){
  inject(Router).navigate(['/']);
  return false;
  }else{
    return true;
  }


  //return inject(serviceService).logueado;
};
