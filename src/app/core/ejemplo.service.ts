import { Injectable } from '@angular/core';
import { LoginI } from './login.interface';
import { ResponseI } from './response.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { RegisterI } from './register.interface';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class EjemploService {

  url: string = "http://localhost:8080/apirest";

  constructor( private http: HttpClient) { }

  logueado = false;
  category:number | undefined;

  getData():Observable<any>{
    let direccion = this.url+"/all";
    return this.http.get(direccion);
  }

  compruebaUser(ModelFormu: LoginI):Observable<any>{
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

}
