import { Component , OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { serviceService } from 'src/app/core/service.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent {

  cookieService = inject(CookieService);
  cookieValue: string | undefined;

  constructor(private router: Router , private api: serviceService){}

  viewProducts(category: number){
    //Recogemos la categoria con la que trabajamos y la guardamos
    if(category === 0){
      this.api.category=0;
    }else if(category ===1 ){
      this.api.category=1;
    }  else if(category === 2){
      this.api.category=2;
    }

    this.router.navigate(['/categories',  this.api.category , 1]);
    this.cookieService.set('category',  this.api.category.toString());
  }
}
