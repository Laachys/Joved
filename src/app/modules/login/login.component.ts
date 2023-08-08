import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  resultado!: string;

hide= true;
// password = "123456";
constructor(private fb: FormBuilder) { }

formularioRegister = this.fb.group({
  username: ['' , [Validators.required, Validators.minLength(6)]],
  password: ['', [Validators.required, Validators.minLength(8)]]
});


 onSubmit(): void {
  // Aquí puedes realizar la autenticación con los datos ingresados
  // Por ejemplo, podrías enviar estos datos a un servicio que maneje la autenticación.
  // Por ahora, simplemente mostraremos los datos ingresados en la consola.
  console.log(`Username:${this.formularioRegister.value.username}, Password: ${this.formularioRegister.value.password}`);

}
}
