// import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { serviceService } from 'src/app/core/service.service';
import { LoginI } from 'src/app/core/login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [CookieService],
})
export class LoginComponent {

  data: any[] = [];
  showalert: boolean = true;
  hide = true; //Variable que consigue que se muestre la contraseña en el login
  protected ModelFormu: LoginI = {
    username: '',
    password: '',
  };
  cookieService = inject(CookieService);
  cookieValue: string | undefined;


  constructor(private api: serviceService, private router: Router) {}

  formularioLogin = new FormGroup({
    username: new FormControl('',(Validators.required, Validators.minLength(4))),
    password: new FormControl('', Validators.required),
  });

  onSubmit(): void {
    this.ModelFormu.password = this.formularioLogin.controls['password'].value ?? '';
    this.ModelFormu.username = this.formularioLogin.controls['username'].value ?? '';

    if (this.formularioLogin.valid) {
      this.api.compruebaUser(this.ModelFormu).subscribe((data) => {
        this.api.id_user = data;

        if (data != null) {
          this.router.navigate(['home']);
          this.api.logueado = true;
          this.showalert = true;
          this.cookieService.set('Id_user', this.api.id_user);
          this.cookieValue = this.cookieService.get('Id_user');

        } else {
          this.router.navigate(['login']);
          this.api.logueado = false;

          this.showalert = false;

          setTimeout(() => {
            this.showalert = true; // Esto ocultará la alerta
          }, 6000);
        }
      });
    }
  }
}
