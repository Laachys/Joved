import { Component , Renderer2 } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { Router} from '@angular/router';
import { EjemploService } from 'src/app/core/ejemplo.service';
import {  RegisterI } from 'src/app/core/register.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {
  resultado!: string;
  data :any[] = [];
  hide= true;
  valid = false;
  existeusername: string ="";

protected ModelFormu : RegisterI  = {
  username: '',
  name: '',
  surname: '',
  password: '',
  phone: '',
  date: '',
  email: ''
}
// password = "123456";
constructor(private fb: FormBuilder, private api: EjemploService, private router: Router) { }

formularioRegister = this.fb.group({
  username: ['' , [Validators.required, Validators.minLength(4)]],
  surname: ['', [Validators.required, Validators.minLength(4)]],
  name: ['', [Validators.required, Validators.minLength(4)]],
  password: ['', [Validators.required, Validators.minLength(8)]],
  phone:['',[Validators.required, Validators.pattern('[0-9]{9}')]],
  date: [''],
  email: ['', [Validators.required, Validators.email]]
});

// ngOnInit(): void {
//   // Agregar una clase al body al cargar el componente
//   this.renderer.addClass(document.body, 'component-background');
// }

 onSubmit(): void {
  // Aquí puedes realizar la autenticación con los datos ingresados
  // Por ejemplo, podrías enviar estos datos a un servicio que maneje la autenticación.
  // Por ahora, simplemente mostraremos los datos ingresados en la consola.
 // console.log(`Username: ${this.username}, Password: ${this.password}`);
  //console.log(`EMAIL: ${this.formularioRegister.value.email}`)
  if (this.formularioRegister.valid)
      this.resultado = "Todos los datos son válidos";
    else
      this.resultado = "Hay datos inválidos en el formulario";

  // this.api.compruebaUser(this.formularioRegister).subscribe(data => {
  //   this.data = data;
  //     console.log(this.data);
  // })


  this.ModelFormu.username = this.formularioRegister.controls['username'].value ?? "";
  this.ModelFormu.name = this.formularioRegister.controls['name'].value ?? "";
  this.ModelFormu.surname = this.formularioRegister.controls['surname'].value ?? "";
  this.ModelFormu.password = this.formularioRegister.controls['password'].value ?? "";
  this.ModelFormu.email = this.formularioRegister.controls['email'].value ?? "";
 const date = new Date(this.formularioRegister.controls['date'].value ?? "");
 this.ModelFormu.date =date.getUTCFullYear()+"-"+ (date.getUTCMonth()+1)+"-"+ (date.getUTCDate()+1);
  this.ModelFormu.phone = this.formularioRegister.controls['phone'].value ?? "";

  this.api.registerUser(this.ModelFormu).subscribe(data => {
    this.data = data;
   // console.log(data);
    if(data.response == "Creado con exito"){
      this.api.logueado = true;
      setTimeout(() => {
        console.log("Cambiando...");
      this.router.navigate(['login']);
      }, 3000);

    }else{
      this.api.logueado = false;
    }
  })
}

compruebaUsername(): void{
 this.api.compruebaUsername(this.formularioRegister.controls['username'].value ?? "").subscribe(data =>{
  this.data = data;

  this.existeusername = data.response;


 })
}

}
