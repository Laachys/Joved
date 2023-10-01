import { EjemploService } from 'src/app/core/ejemplo.service';
import { Component } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-shared-navbar',
  templateUrl: './shared-navbar.component.html',
  styleUrls: ['./shared-navbar.component.scss']
})
export class SharedNavbarComponent {
  logueado:boolean | undefined;


constructor(private api: EjemploService, private router: Router){
  this.logueado = this.api.logueado;
}

login(){
this.router.navigate(['/login']);

}


}
