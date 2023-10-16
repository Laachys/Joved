// import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { EjemploService } from 'src/app/core/ejemplo.service';
import { LoginI } from 'src/app/core/login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [CookieService]
})


export class LoginComponent {
  data :any[] = [];
  resultado!: string;

hide= true;
protected ModelFormu : LoginI = {
  username: '',
  password: ''
};
cookieService = inject(CookieService);
  cookieValue: string | undefined;
// password = "123456";
constructor( private api: EjemploService , private router: Router) {}




formularioLogin = new FormGroup({
  username: new FormControl('' , (Validators.required, Validators.minLength(4))),
  password: new FormControl('', (Validators.required, Validators.minLength(8)))
});

// getAll(){
//   return this.http.get("http://localhost:8080/user");
// }

// create(data: any){
//   return this.http.post("http://localhost:8080/user", data);

// }
// onInit(): void{

// }
 onSubmit(): void {



this.ModelFormu.password = this.formularioLogin.controls['password'].value ?? "";
this.ModelFormu.username = this.formularioLogin.controls['username'].value ?? "";

// let Form = JSON.stringify(this.formularioLogin.value);
// console.log(Form);

  // Aquí puedes realizar la autenticación con los datos ingresados
  // Por ejemplo, podrías enviar estos datos a un servicio que maneje la autenticación.
  // Por ahora, simplemente mostraremos los datos ingresados en la consola.
  //console.log(`Username:${this.formularioLogin.value.username}, Password: ${this.formularioLogin.value.password}`);
// this.api.getData().subscribe(data =>{
//   this.data = data;
//   console.log(this.data);

// })

this.api.compruebaUser(this.ModelFormu).subscribe(data => {
    //this.data = this.api.id_user;

    this.api.id_user = data;
    console.log(data);
      if(data){
         this.router.navigate(['home']);
         this.api.logueado = true;
         this.cookieService.set('Id_user',  this.api.id_user );
         this.cookieValue = this.cookieService.get('Id_user');
      }else{
        this.router.navigate(['login']);
        this.api.logueado = false;

      }
  })
}

// onLogin(form: LoginI ){
//  this.api.loginBySurname(form).subscribe(data =>
//   console.log(data));
// }
}
