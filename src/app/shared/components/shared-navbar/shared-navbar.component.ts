import { serviceService } from 'src/app/core/service.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-shared-navbar',
  templateUrl: './shared-navbar.component.html',
  styleUrls: ['./shared-navbar.component.scss'],
})
export class SharedNavbarComponent {
  logueado: boolean | undefined;
  //home: boolean = true;

  constructor(
    private api: serviceService,
    private router: Router,
    private cookieService: CookieService ,
    private route: ActivatedRoute
  ) {
    this.logueado = this.api.logueado;
    //this.home = this.api.home;
  }

  login() {
    this.router.navigate(['/login']);
  }

  newProduct() {
    this.router.navigate(['/newproduct']);
  }

  home(){
  this.router.navigate(['/']);
  }

  logOut() {
    this.cookieService.set('Id_user', '');
    this.api.logueado = false;
    this.router.navigate(['/home']);
  }

  profile(){
    this.router.navigate(['/profile']);
  }

  isHome(){
    const currentPath = this.route.snapshot.url.join('/');
    if(currentPath == "" || currentPath =="home"){
      return true;
    }else{
      return false;
    }
  }
}
