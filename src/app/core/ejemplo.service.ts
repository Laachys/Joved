import { Component, Injectable } from '@angular/core';
import { LoginI } from './login.interface';
import { ResponseI } from './response.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { RegisterI } from './register.interface';
import { ProductI } from './product.interface';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class EjemploService {

  url: string = "http://localhost:8080/apirest";

  constructor( private http: HttpClient, private cookieService: CookieService) {
    if(this.id_user != ""){
      this.logueado = true;
    }
   }

  formData = new FormData();
  logueado = false;
  category:number = -1;
  id_user: any =   this.cookieService.get('Id_user');;
  id_producto : any;

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

  addProduct(formData : FormData,ModelFormu: ProductI): Observable<any>{
    console.log(ModelFormu);
    let direccion = this.url+"/newproduct";
    const boundary = 'XXX';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const files = JSON.stringify({formData, ModelFormu});
    return this.http.post(direccion ,files, {headers});
  }

  addImages(formData : FormData) : Observable<any>{
    let direccion = this.url+"/addimages";

    return this.http.post(direccion ,formData);
  }
}
