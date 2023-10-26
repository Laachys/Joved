import { Component, Renderer2 } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { Router } from '@angular/router';
import { serviceService } from 'src/app/core/service.service';
import { RegisterI } from 'src/app/core/register.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  resultado!: string;
  data: any[] = [];
  hide = true;
  valid = false;
  existeusername: string = '';
  showalert :boolean = false;

  protected ModelFormu: RegisterI = {
    username: '',
    name: '',
    surname: '',
    password: '',
    phone: '',
    date: '',
    email: '',
  };
  // password = "123456";
  constructor(
    private fb: FormBuilder,
    private api: serviceService,
    private router: Router
  ) {}

  formularioRegister = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    surname: ['', [Validators.required, Validators.minLength(4)]],
    name: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    phone: ['', [Validators.required, Validators.pattern('[0-9]{9}')]],
    date: [''],
    email: ['', [Validators.required, Validators.email]],
  });

  onSubmit(): void {
    // Aquí puedes realizar la autenticación con los datos ingresados
    // Por service, podrías enviar estos datos a un servicio que maneje la autenticación.
    // Por ahora, simplemente mostraremos los datos ingresados en la consola.

    if (this.formularioRegister.valid) {
      this.ModelFormu.username = this.formularioRegister.controls['username'].value ?? '';
      this.ModelFormu.name = this.formularioRegister.controls['name'].value ?? '';
      this.ModelFormu.surname = this.formularioRegister.controls['surname'].value ?? '';
      this.ModelFormu.password = this.formularioRegister.controls['password'].value ?? '';
      this.ModelFormu.email = this.formularioRegister.controls['email'].value ?? '';
      const date = new Date(
        this.formularioRegister.controls['date'].value ?? ''
      );
      this.ModelFormu.date = date.getUTCFullYear() + '-' +(date.getUTCMonth() + 1) + '-' +  (date.getUTCDate() + 1);
      this.ModelFormu.phone = this.formularioRegister.controls['phone'].value ?? '';

      this.api.registerUser(this.ModelFormu).subscribe((data) => {
        this.data = data;
        if (data.response == 'Creado con exito') {
          this.api.logueado = true;
          this.showalert = true;
          setTimeout(() => {
            this.showalert = false;
          }, 3000);

          setTimeout(() => {
            this.router.navigate(['login']);
          }, 5000);

        } else {
          this.api.logueado = false;
        }
      });
    }
  }
  compruebaUsername(): void {
    this.api
      .compruebaUsername(this.formularioRegister.controls['username'].value ?? '').subscribe((data) => {
        this.data = data;
        this.existeusername = data.response;
      });
  }
}
