import { Component , OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { EjemploService } from 'src/app/core/ejemplo.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {


  constructor(private router: Router , private api: EjemploService){}
  redirectToBuy(){
    this.router.navigate(['/categories']);

  }
  redirectToSold(){
    this.router.navigate(['/categories']);

  }

  viewProducts(category: number){
    //Recogemos la categoria con la que trabajamos y la guardamos
    if(category === 0){
      this.router.navigate(['/categories']);
      this.api.category=0;

    }else if(category ===1 ){
      this.api.category=1;
      this.router.navigate(['/categories']);

    }  else if(category === 2){
      this.api.category=2;
      this.router.navigate(['/categories']);

    }
  }
}
