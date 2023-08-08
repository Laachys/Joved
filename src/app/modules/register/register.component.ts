import { Component , Renderer2 } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {
  resultado!: string;

hide= true;
// password = "123456";
constructor(private fb: FormBuilder, private renderer: Renderer2) { }

formularioRegister = this.fb.group({
  username: ['' , [Validators.required, Validators.minLength(6)]],
  surname: ['', [Validators.required, Validators.minLength(10)]],
  name: ['', [Validators.required, Validators.minLength(10)]],
  password: ['', [Validators.required, Validators.minLength(8)]],
  phone:['',[Validators.required]],
  fetch: [''],
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
  console.log(`EMAIL: ${this.formularioRegister.value.email}`)
  if (this.formularioRegister.valid)
      this.resultado = "Todos los datos son válidos";
    else
      this.resultado = "Hay datos inválidos en el formulario";

}
}
