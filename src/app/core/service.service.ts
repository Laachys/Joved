import { Component, Injectable } from '@angular/core';
import { LoginI } from './login.interface';
import { ResponseI } from './response.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { RegisterI } from './register.interface';
import { ProductI } from './product.interface';
import { CookieService } from 'ngx-cookie-service';
import { FavoriteI } from './favorite.interface';

@Injectable({
  providedIn: 'root',
})
export class serviceService {

  url: string = "http://localhost:8080/apirest";

  constructor( private http: HttpClient, private cookieService: CookieService) {
    if(this.id_user != ""){
      this.logueado = true;
    }
   }

  formData = new FormData();
  logueado = false;
  category:number = -1;
  id_user: any =   this.cookieService.get('Id_user');
  id_producto : any;
  home = false;

  getData():Observable<any>{
    let direccion = this.url+"/all";
    return this.http.get(direccion);
  }

  compruebaUser(ModelFormu: LoginI):Observable<any>{
    console.log(ModelFormu);
    let direccion = this.url+"/verifica";

    return this.http.post(direccion , ModelFormu);
  }

  registerUser(ModelFormu: RegisterI):Observable<any>{
    let direccion = this.url+"/addUser";
    return this.http.post(direccion , ModelFormu);

  }

  compruebaUsername(username: string):Observable<any>{
    let direccion = this.url+"/checkUsername";
    return this.http.post(direccion , username);
  }

  productosPorCategoria(category: number):Observable<any>{
    let direccion = this.url+"/allforcategory";
    return this.http.post(direccion , category);
  }

  // addProduct(formData : FormData,ModelFormu: ProductI): Observable<any>{
  //   console.log(ModelFormu);
  //   let direccion = this.url+"/newproduct";
  //   const boundary = 'XXX';
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   });
  //   const files = JSON.stringify({formData, ModelFormu});
  //   return this.http.post(direccion ,files, {headers});
  // }

  addProduct(formData : FormData) : Observable<any>{
    let direccion = this.url+"/addproduct";

    return this.http.post(direccion ,formData);
  }

  favoriteProduct(ModelFormu: FavoriteI):Observable<any>{
    console.log(ModelFormu);
    let direccion = this.url+"/savefavorite";
    return this.http.post(direccion , ModelFormu);

  }

  allfavorites(id_user : string): Observable<any> {
    let direccion = this.url+"/allfavorites";
    return this.http.post(direccion , id_user);

  }

  product(id_product: number): Observable<any>{
    let direccion = this.url+"/product";
    return this.http.post(direccion , id_product);
  }

  buyproduct(formData: FavoriteI): Observable<any>{
    let direccion = this.url+"/buyproduct";
    return this.http.post(direccion , formData);
  }

  allproductbyiduser(id_user : string) : Observable<any>{
    let direccion = this.url +"/allproductsbyid";
    return this.http.post(direccion , id_user);
  }

  allproducts() : Observable<any>{
    let direccion = this.url+"/allproducts";
    return this.http.get(direccion);
  }

  changepass(formData : FormData):Observable<any>{
    let direccion = this.url+"/changepassword";

    return this.http.post(direccion ,formData);
  }

  changeemail(formData : FormData):Observable<any>{
    let direccion = this.url+"/changeemail";
    return this.http.post(direccion ,formData);
  }

  checkpass(formData : FormData):Observable <any>{
    let direccion = this.url+"/checkpass";
    return this.http.post(direccion ,formData);
  }

  closecount(formData : FormData):Observable <any>{
    let direccion = this.url+"/desactivateacount";
    return this.http.post(direccion ,formData);
  }
}
