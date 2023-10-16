import { EjemploService } from 'src/app/core/ejemplo.service';
import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-shared-navbar',
  templateUrl: './shared-navbar.component.html',
  styleUrls: ['./shared-navbar.component.scss']
})
export class SharedNavbarComponent {
  logueado:boolean | undefined;


constructor(private api: EjemploService, private router: Router , private cookieService: CookieService){
  this.logueado = this.api.logueado;
}

login(){
this.router.navigate(['/login']);

}

newProduct(){
  this.router.navigate(['/newproduct']);
}

logOut(){
  this.cookieService.set('Id_user', '');
  this.router.navigate(['/login']);

}
}
