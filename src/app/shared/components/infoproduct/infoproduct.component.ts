import { Component, ViewChild, inject } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FavoriteI } from 'src/app/core/favorite.interface';
import { serviceService } from 'src/app/core/service.service';


@Component({
  selector: 'app-infoproduct',
  templateUrl: './infoproduct.component.html',
  styleUrls: ['./infoproduct.component.scss']
})
export class InfoproductComponent {
  protected ModelFormu: FavoriteI = {
    id_user: '',
    id_product: '',
  };

  category: string = '';
  p: number = 1;
  id_product: string = '';
  product: any;
  jsonImag: any;
  user: any;
  logueado:boolean;
  buttondisabled = false;

  @ViewChild(MatAccordion)
  accordion!: MatAccordion;

  cookieService = inject(CookieService);
  id_user: string | undefined;


  constructor(private api: serviceService,  private rutaActiva: ActivatedRoute){
    this.logueado = this.api.logueado;
    console.log(this.logueado);
    this.category = this.rutaActiva.snapshot.params['category'];
    this.p = this.rutaActiva.snapshot.params['pag'];
    this.id_product = this.rutaActiva.snapshot.params['id_product'];
    this.id_user = this.cookieService.get('Id_user');
    console.log(this.id_product);

    this.api.product(parseInt(this.id_product)).subscribe((data =>{

      this.user = JSON.parse(data.user);
      this.product = JSON.parse(data.product);

      if(this.product.active == "0" || (this.product.id_user == this.id_user)){
        this.buttondisabled = true;
      }

      this.jsonImag = JSON.parse(data.files);
      return data;
      }
      ));
  }

  contieneImg(id: string): boolean {
    var bool = false;
    for (const img of this.jsonImag) {
      if (img.name.slice(0, img.name.indexOf('_')) == id) bool = true;
    }
    return bool;
  }

  buy(){
    //console.log("VOY A COMPRAR")
    this.ModelFormu.id_product= this.id_product;
    this.ModelFormu.id_user = this.user.id;

    this.api.buyproduct(this.ModelFormu).subscribe((data => {
      if(data.response == "true"){
        this.buttondisabled = true;
      }
    }
    ));
  }

}
